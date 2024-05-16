
import Link from "next/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Searchbar from "@/components/Searchbar";
import { getAllComposers, getAllPieces } from "./firebase/queries";
import { Button } from "@nextui-org/button";

export default async function Home() {
	const composerSnaps = await getAllComposers();
        const composers = composerSnaps.map((composer) => {
                    return composer.data();
	})
	const pieceSnaps = await getAllPieces();
	const pieces = pieceSnaps.map((piece)=> {
		return piece.data();
	})
	const searchableItems = composers.concat(pieces);

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "violet" })}>Learn&nbsp;</h1>
				<br />
				<h1 className={title()}>
					about your favorite composers and pieces
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					A piano reference for your musical journey.</h2>
			</div>

			<div className="w-full flex flex-col items-center justify-center gap-4">
				<div className="w-full max-w-screen-md relative z-40">
				<Searchbar placeholder="Search composers / pieces"searchables={searchableItems} />
				
				</div>
				<div className="flex gap-2">
				<Button
      href="/composers"
      as={Link}
      color="primary"
      variant="solid">All Composers</Button>
	  <Button
      href="/piecelist"
      as={Link}
      color="secondary"
      variant="solid">All Pieces</Button>
				</div>
				
    </div>

		</section>
	);
}
