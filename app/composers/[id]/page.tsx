import { getComposer } from "@/app/firebase/queries"

export default async function Page({ params } : { params: { id: string }}) {
    const post = await getComposer(params.id);
    console.log(post);
    return (


        <div className="w-100">
            <p>ID: {params.id}</p>
            <p>sdf</p>
            <p>composer {post?.name}</p>
        </div>
    )
}