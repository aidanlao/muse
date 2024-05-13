import { getComposer } from "@/app/firebase/queries"
import ComposerImage from "@/components/ComposerImage";
import { title } from "@/components/primitives";

export default async function Page({ params } : { params: { id: string }}) {
    const composer = await getComposer(params.id);
    return (


        <div className="w-100 flex flex-col-reverse md:flex-row">
            {/* <p>ID: {params.id}</p>
            <p>sdf</p>
            <p>composer {post?.name}</p> */}
            
            <div className="md:basis-1/4 md:max-h-80">
            <ComposerImage url={composer?.image}/>
            
            </div>
            <div className="md:basis-3/4 flex gap-4 pb-4 flex-col md:px-5">
                <h1 className={`text-2xl md:text-8xl font-black md:relative -left-10 z-10`}>{composer?.lastName}</h1>
                <p className="text-xl font-thin">{composer?.name}</p>
                <p className="max-w-2xl">{composer?.description}</p>
            </div>
        </div>
    )
}