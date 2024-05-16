import { getAllComposers, getAllPieces } from "../firebase/queries";
import Link from "next/link"
export default async function pieceDirectory() {

    const pieces = await getAllPieces();
    const pieceList = pieces?.map((pieceDoc) => {
        const piece = pieceDoc.data();
        return (
            <Link
                key={piece.id}
                href={`composers/${piece.composerid}/${piece.id}`}
                className="text-sky-700 hover:text-sky-500"
            >
                {piece.name}
            </Link>
        )
            ;
    })


    return (
        <div>
            <h1 className="font-extrabold text-4xl mb-6">pieces </h1>
            <ul className="flex flex-col">

            {pieceList}
            </ul>
        </div>
    );
}