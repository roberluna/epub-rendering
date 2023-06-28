import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react"
import { API } from "aws-amplify"
import { listEpubs } from "@/graphql/queries"
import { deleteEpub as deleteEpubMutation } from "@/graphql/mutations";
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

  async function deleteEpub(id){
    await API.graphql({
      query: deleteEpubMutation,
      variables: {input: { id } },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    })
    fetchEpubs()
  }

  return (
      <div>
        <h1 className='text-sky-400 text-3xl font-bold tracking-wide mt-6 mb-2'>Publicaciones</h1>
        {epubs.map((epub, index) => (
          <div className='my-6 pb-6 border-b border-gray-300'>
            <div className='cursor-pointer mt-2'>
              <h2 className='text-xl font-semibold' key={index}>
                {epub.title}
              </h2>
              <p className='text-gray-500 mt-2'>Author: {epub.username}</p>
            </div>
            <div className='sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-1'>
              <p
                className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 
    hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none 
    focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
              >
                {/* <Link href={`/edit-post/${post.id}`}>Edit Post</Link> */}
              </p>

              <p
                className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 
    hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none 
    focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'
              >
                <Link href={`/epub/${epub.id}`}>View</Link>
              </p>

              <button className='text-sm mr-4 text-red-500' onClick={() => deleteEpub(epub.id)}>
                Delete
              </button>
            </div>
          </div>
      ))}
      </div>
  )
}

export default withAuthenticator(Home)