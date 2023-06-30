import { API, Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { listEpubs, getEpub } from "@/graphql/queries";
import { ReactReader } from 'react-reader'

export default function Epub({epub}){
    const [file, setFile] = useState(null)
    const [location, setLocation] = useState(null)
    const locationChanged = epubcifi => {
        // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
        setLocation(epubcifi)
    }
    const router = useRouter()
    
    if(router.isFallback){
        return <div>Loading...</div>
    }

    
    useEffect(()=>{
        updateFile()
    },[])

     async function updateFile(){
        if(epub.file){
            const fileKey = await Storage.get(epub.file)
            let fileName = fileKey.split("?")[0]
            setFile(fileName)
        }
    }

    return (
        <div>
            <h1 className="text-5xl mt-4 font-semibold tracing-wide">
                {epub.title}
            </h1>
            <p className="text-sm font-light my-4">By {epub.username}</p>

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

export async function getStaticPaths() {
  const epubData = await API.graphql({
    query: listEpubs
  })
  const paths = epubData.data.listEpubs.items.map(epub => ({ params: { id: epub.id }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}){
    const {id} = params
    const epubData = await API.graphql({
        query: getEpub,
        variables: {id}
    })

    return {
        props:{
            epub: epubData.data.getEpub
        },
        revalidate: 1
    }
}