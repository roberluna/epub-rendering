import { useEffect, useState, React, useRef } from "react";
import { API, Storage } from "aws-amplify";
import { useRouter } from "next/router";
import {getEpub } from "@/graphql/queries";
import { updateEpub } from "@/graphql/mutations";
import { ReactReader } from 'react-reader'
import {v4 as uuid} from "uuid"

function EditEpub(){
    const [epub, setEpub] = useState(null)
    const [file, setFile] = useState(null)
    const [location, setLocation] = useState(null)
    const [message, setMessage] = useState("")
    const [isEpub, setIsEpub] = useState(null)
    const fileInput =  useRef(null)
    const locationChanged = epubcifi => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }
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
            const fileKey = await Storage.get(epubData.data.getEpub.file)
            let fileName = fileKey.split("?")[0]
            setFile(fileName)
        }
    }, [id])

    if(!epub) return

    function handleChange(e){
        const fileUpload = e.target.files[0]
        if(!fileUpload) return
        setFile(fileUpload)
    }

    async function uploadEpub(){
        fileInput.current.click()
    }

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
            description,
            file
        }
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
            epubUpdated.file = filename
            await Storage.put(filename, file)
        }
        await API.graphql({
            query: updateEpub,
            variables: {input: epubUpdated},
            authMode: "AMAZON_COGNITO_USER_POOLS"
        })
        router.push(`/epub/${id}`)
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

                <input type="file" ref={fileInput} className="absolute w-0 h-0" onChange={handleChange}/>
                <p>
                    <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg" onClick={uploadEpub}>Subir epub</button>
                </p>

                <p>
                    <button type="button" className="mb-4 bg-blue-600 text-white font-semibold px-8 py-2 rounded-lg" onClick={updateCurrentEpub}>Editar</button>
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

                <div style={{ height: '100vh' }}>
                    <ReactReader
                        location={location}
                        locationChanged={locationChanged}
                        url={file}
                    />
                </div>
            
               
                
        </div>
    )
}

export default EditEpub;

