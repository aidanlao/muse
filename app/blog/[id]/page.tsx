import { getItem } from "@/app/firebase/queries"

export default async function Page({ params } : { params: { id: string }}) {
    const post = await getItem(params.id);
    console.log(post);
    return (


        <>
        <div className="text-center w-100" >
        <p>ID: {params.id}</p>
            <p>sdaf</p>
            <p>composer {post?.composer}</p>
        </div>
           
        </>
    )
}