import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect, React } from "react";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid"
import { createEpub } from "@/graphql/mutations";

const initialState = {title: "", description: "", file: "demo"}

function CreateEpub(){
    const [epub, setEpub] = useState(initialState)
    const {title, description, file} = epub
    const router = useRouter()

    function onChange(e){
        setEpub(()=>({
            ...epub, [e.target.name]: e.target.value
        }))
    }

    async function createNewEpub(){
        if(!title || !description) return;

        const id = uuid();
        epub.id = id;
        await API.graphql({
            query: createEpub,
            variables: {input: epub},
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        router.push(`/epub/${id}`)
    }

    return(
        <div>
            {epub.title}
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

           {/* <input 
            type="file"
            ref={imageFileInput}
            className="absolute w-0 h-0"
            onChange={handleChange}
           /> */}

           <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg" onClick={createNewEpub}>
                Crear
           </button>


           <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
            // onClick={uploadeImage}
           >
                Upload cover image
           </button>

        </div>
    )
}

export default withAuthenticator(CreateEpub)