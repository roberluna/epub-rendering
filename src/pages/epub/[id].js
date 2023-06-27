import { API } from "aws-amplify";
import { useRouter } from "next/router";
import { listEpubs, getEpub } from "@/graphql/queries";

export default function Epub({epub}){
    const router = useRouter()
    
    if(router.isFallback){
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1 className="text-5xl mt-4 font-semibold tracing-wide">
                {epub.title}
            </h1>
            <p className="text-sm font-light my-4">By {epub.username}</p>
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