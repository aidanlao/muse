import { getComposer } from "@/app/firebase/queries"
import ComposerImage from "@/components/ComposerImage";

export default async function Page({ params } : { params: { id: string }}) {
    const post = await getComposer(params.id);
    console.log(post);
    return (


        <div className="w-100">
            <p>ID: {params.id}</p>
            <p>sdf</p>
            <p>composer {post?.name}</p>
            <ComposerImage url="https://upload.wikimedia.org/wikipedia/commons/3/33/Chopin%2C_by_Wodzinska.JPG"/>
        </div>
    )
}