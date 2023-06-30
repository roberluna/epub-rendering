import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useRef, React } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid"
import { createEpub } from "@/graphql/mutations";

const initialState = {title: "", description: ""}

function CreateEpub(){
    const [epub, setEpub] = useState(initialState)
    const {title, description} = epub
    const router = useRouter()
    const [file, setFile] = useState(null)
    const fileInput =  useRef(null)

    function onChange(e){
        setEpub(()=>({
            ...epub, [e.target.name]: e.target.value
        }))
    }

    async function createNewEpub(){
        if(!title || !description || !file) return; 

        const id = uuid();
        epub.id = id;

        if(file){
            let arr = file.name.split(".")
            const name = arr[0]
            const ext = arr[1]
            const filename = `${name}_${uuid()}.${ext}`
            epub.file = filename
            await Storage.put(filename, file)
        }

        await API.graphql({
            query: createEpub,
            variables: {input: epub},
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        router.push(`/epub/${id}`)
    }

    async function uploadFile(){
      fileInput.current.click()
    }

    function handleChange(e){
        const fileUploaded =  e.target.files[0]
        if(!fileUploaded) return
        setFile(fileUploaded)
    }

    return(
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6">Crear ePub</h1>
            <input
                onChange={onChange}
                name="title"
                placeholder="title"
                value={epub.title}
                className="border-b pb-2 text-lg my-4 focus:outline-none w-full text-gray-500 placeholder-gray-500 y-2"
            />

            <input
                onChange={onChange}
                name="description"
                placeholder="description"
                value={epub.description}
                className="border-b pb-2 text-lg my-4 focus:outline-none w-full text-gray-500 placeholder-gray-500 y-2"
            />

            <input 
                type="file"
                ref={fileInput}
                className="absolute w-0 h-0"
                onChange={handleChange}
           />

           <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg" onClick={createNewEpub}>
                Crear
           </button>


           <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
            onClick={uploadFile}
           >
                Subir epub
           </button>

        </div>
    )
}

export default withAuthenticator(CreateEpub)