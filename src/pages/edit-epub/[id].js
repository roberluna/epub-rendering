import { useEffect, useState, React, useRef } from "react";
import { API } from "aws-amplify";
import { useRouter } from "next/router";
import {getEpub } from "@/graphql/queries";
import { updateEpub } from "@/graphql/mutations";

function EditEpub(){
    const [epub, setEpub] = useState(null)
    const router = useRouter()
    const {id} =  router.query

    useEffect(()=> {
        fetchEpub()
        async function fetchEpub(){
            if(!id) return
            const epubData =  await API.graphql({
                query: getEpub,
                variables: {id}
            })
            setEpub(epubData.data.getEpub)
        }
    }, [id])

    if(!epub) return

    function onChange(e){
        setEpub(()=> ({
            ...epub, [e.target.name] : e.target.value
        }))
    }

    const {title, description} = epub
    async function updateCurrentEpub(){
        if(!title || !description) return
        const epubUpdated = {
            id, 
            title,
            description
        }
        await API.graphql({
            query: updateEpub,
            variables: {input: epubUpdated},
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        router.push('/')
    }


    return (
            <div>
                <h1 className="text-3xl font-semibold tracking-wide mt-6">Editar</h1>
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
            
                <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg"
                    onClick={updateCurrentEpub}
                >
                    Editar
                </button>
        </div>
    )
}

export default EditEpub;

