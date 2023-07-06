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
    const [message, setMessage] = useState("")
    const [isEpub, setIsEpub] = useState(null)
    const router = useRouter()
    const [file, setFile] = useState(null)
    const fileInput =  useRef(null)

    function onChange(e){
        setEpub(()=>({
            ...epub, [e.target.name]: e.target.value
        }))
    }

    async function createNewEpub(){
        if(!title || !description || !file) {
            return setMessage('Todos los campos son obligatorios')
        }; 

        const id = uuid();
        epub.id = id;

        if(file){
            let arr = file.name.split(".")
            const name = arr[0]
            const ext = arr[1]
            if(ext != 'epub'){
                setIsEpub(false)
                return setMessage('Solo se permiten archivos con extension .epub')
            }
            setIsEpub(true)
            setMessage('Subiendo archivo, por favor espere ...')
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
            <p>
            <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
            onClick={uploadFile}
           >
                Subir epub
           </button>
           {file &&(
                file.name
            )
           }
            </p>

            <p>
           <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg" onClick={createNewEpub}>
                Crear
           </button>
           </p>

           {isEpub && (

            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                <span className="block sm:inline">{message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>

           )
            }


            {message != "" && (

             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
           )
            }

          
       
            
        </div>
    )
}

export default withAuthenticator(CreateEpub)