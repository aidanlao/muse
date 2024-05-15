import { getAllComposers } from "../firebase/queries";
import Link from "next/link"
export default async function composerDirectory() {

    const composers = await getAllComposers();
    const composerList = composers?.map((composer) => {
        const c = composer.data();
        return (
            <Link
                key={c.id}
                href={`composers/${composer.id}`}
                className="text-sky-700 hover:text-sky-500"
            >
                {c.name}
            </Link>
        )
            ;
    })


    return (
        <div>
            <h1 className="font-extrabold text-4xl mb-6">composers </h1>
            <ul className="flex flex-col">

            {composerList}
            </ul>
        </div>
    );
}