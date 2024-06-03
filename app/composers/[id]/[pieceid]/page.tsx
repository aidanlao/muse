import { getAllComposers, getAllPieces, getAllPiecesBy, getComposer, getPiece, getPopularPiecesBy } from "@/app/firebase/queries"
import ComposerImage from "@/components/ComposerImage";
import PlayablePiece from "@/components/playablePiece";
import { title } from "@/components/primitives";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import clsx from "clsx";
import { Spotify } from "react-spotify-embed";
export async function generateStaticParams() {
    const pieces = await getAllPieces();
    const staticParams = pieces.map((pieceDoc) => {
        const piece = pieceDoc.data();
        return {
            pieceid: piece.id,
            id: piece.composerid,
        }
    })
    return staticParams;

}
export default async function Page({ params }: { params: { id: string, pieceid: string } }) {
    //console.log("params for parent composer is " + params.id);
    //console.log("params for pag are " + params.pieceid);
    const piece = await getPiece(params.pieceid);
    const spotifyLink = piece?.spotifyLink;
    return (
        <>
            {
                piece ? (
                    <>
                        <div className="w-100 pb-5 flex justify-center flex-col-reverse md:flex-row">

                            <div className="md:basis-1/4 md:max-h-80">
                               { !spotifyLink ? 
                                (<Image
                                    classNames={{
                                        wrapper: "h-full",
                                        img: "h-full w-full object-cover object-top",
                                    }}
                                    as={NextImage}
                                    width={300}
                                    height={200}
                                    src={"https://wallpapercave.com/wp/wp6355900.jpg"}
                                    alt="NextUI hero Image"
                                />) : (
<Spotify link={spotifyLink} />

                                )
            }
                            </div>
                            <div className="md:basis-3/4 flex gap-4 pb-4 flex-col  md:px-5">
                                <h1 className={clsx(piece?.name.length >40 ? "text-3xl" : "md:text-8xl sm:text-6xl md:relative" , `text-3xl  font-black   -left-10 z-10`)}>{piece?.name}</h1>
                                <div className="flex gap-4">
                                    <p className="text-xl font-thin">{piece?.opus}</p>
                                    <Link
                                        href={`/composers/${piece.composerid}`}
                                        className="text-sky-700 text-xl font-thin hover:text-sky-500"
                                    >
                                        {piece.composer}
                                    </Link>
                                </div>

                                <p className="">{piece?.description}</p>
                                <Link
                                    href={`/composers/${piece.composerid}`}
                                    className="flex gap-2 text-sky-700 hover:text-sky-500"
                                >
                                    <p className="flex">
                                        <FaArrowUpRightFromSquare className="m-auto" />
                                    </p>

                                    {piece.composer}
                                </Link>
                            </div>

                        </div>
                    </>
                ) : (
                    <>
                        <p>There is no piece at this URL. </p>
                        <Link href="/composers">Back to composers</Link>
                    </>
                )

            }
        </>



    )
}