import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react"
import { API } from "aws-amplify"
import { listEpubs } from "@/graphql/queries"
import Link from "next/link";

function Home() {
  
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
        <h1 className='text-sky-400 text-3xl font-bold tracking-wide mt-6 mb-2'>Publicaciones</h1>
        {epubs.map((epub, index) => (
        <Link key={index} href={`/epub/${epub.id}`}>
          <div className='my-6 pb-6 border-b border-gray-300'>
            <div className='cursor-pointer mt-2'>
              <h2 className='text-xl font-semibold' key={index}>
                {epub.title}
              </h2>
              <p className='text-gray-500 mt-2'>Author: {epub.username}</p>
            </div>
          </div>
        </Link>
      ))}
      </div>
  )
}

export default withAuthenticator(Home)