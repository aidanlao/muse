import { getAllComposers, getAllPiecesBy, getComposer, getPopularPiecesBy } from "@/app/firebase/queries"
import ComposerImage from "@/components/ComposerImage";
import Piece from "@/components/Piece";
import Searchbar from "@/components/Searchbar";
import PlayablePiece from "@/components/playablePiece";
import { title } from "@/components/primitives";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";



export default async function Page({ params }: { params: { id: string } }) {
    const composer = await getComposer(params.id);
    const pieceDocs = await getAllPiecesBy(params.id);
    const popularPiecesDocs = await getPopularPiecesBy(params.id);
    const popularPieces = popularPiecesDocs.map((pieceSnap: DocumentData) => {
        const piece = pieceSnap.data()
        return (
            <PlayablePiece key={piece.audioid} {...piece} />
        )
    })
    const pieces = pieceDocs.map((piece)=> {
        const data = piece.data();

        const pieceopus = `${data.name} ${data.opus}`;
        const opuspiece = `${data.opus} ${data.name}`;
        const opus = data.opus;
        const name = data.name;

        var keywordsToSearch:Record<string,any> = [];

        if (name.includes("in") || name.includes("on")) {
            const wordsInName = name.split(" ");
            const genre = wordsInName[0];
            keywordsToSearch.push(genre);

            const genreOpus = genre + " " + opus;
            const opusGenre = opus + " " + genre;

            keywordsToSearch.push(genreOpus);
            keywordsToSearch.push(opusGenre);
        } 
        if (name.includes("Variations")) {
            console.log(keywordsToSearch);
        }
        keywordsToSearch.push(data.opus);
        keywordsToSearch.push(data.name);
        keywordsToSearch.push(pieceopus);
        keywordsToSearch.push(opuspiece);

        const searchables = {
            keywords: keywordsToSearch,
            ...data
        }
		return searchables;
	})

    const piecesList = pieces.map((piece:any) => {
        return (
            <Piece composerid={piece.composerid} id={piece.id} opus={piece.opus} name={piece.name} key={piece.id} {...piece} />
        )
    })

    return (
        <>
            {
                composer ? (
                    <>
                        <div className="w-100 flex justify-center flex-col-reverse md:flex-row">


                            <div className="md:basis-1/4 md:max-h-80">
                                <ComposerImage url={composer?.image} />

                            </div>
                            <div className="md:basis-3/4 flex gap-4 pb-4 flex-col  md:px-5">
                                <h1 className={`text-3xl md:text-8xl font-black sm:text-6xl md:relative -left-10 z-10`}>{composer?.lastName}</h1>
                                <p className="text-xl font-thin">{composer?.name}</p>
                                <p className="">{composer?.description}</p>
                            </div>
                        </div>
                        <div className="w-100 py-5 ">
                            <h1 className="text-xl font-thin mb-5">popular</h1>

                            {popularPieces ? (popularPieces) : (<p>No pieces to show.</p>)}
                        </div>


                        <div className="w-100 py-5">
                            <h1 className="text-xl font-thin mb-5">complete list</h1>
                            <Searchbar placeholder={"Search pieces by " + composer?.lastName}searchables={pieces}/>
                            <div className="pt-4 flex flex-col  " >
                                {piecesList}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <p>There is no composer at this URL. </p>
                        <Link href="/composers">Back to composers</Link>
                    </>
                )

            }
        </>



    )
}