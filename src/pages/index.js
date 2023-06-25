import { useState, useEffect } from "react"
import { API } from "aws-amplify"
import { listEpubs } from "@/graphql/queries"


export default function Home() {
  
  const [epubs, setEpubs] = useState([]);

  useEffect(()=>{
    fetchEpubs()
  },[])

  async function fetchEpubs(){
    const epubData = await API.graphql({
      query: listEpubs
    })
    setEpubs(epubData.data.listEpubs.items)
  }

  return (
      <div>
        <h1 className="text-sky-400 text-3xl font-bold">
          Mis publicaciones
        </h1>
        {
          epubs.map( (epub, index) => (
            <p key={index}>{epub.title}</p>
          ))
        }
      </div>
  )
}
