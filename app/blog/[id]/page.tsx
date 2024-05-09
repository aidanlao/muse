import { getItem } from "@/app/firebase/posts"

export default async function Page({ params } : { params: { id: string }}) {
    const post = await getItem(params.id);
    console.log(post);
    return (


        <>
            <p>ID: {params.id}</p>
            <p>sdf</p>
            <p>composer {post?.composer}</p>
        </>
    )
}