
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
            const data = composer.data();
			const searchables = {
				keywords: [data.name],
				...data
			}

			return searchables;
	})
	const pieceSnaps = await getAllPieces();
	const pieces = pieceSnaps.map((piece)=> {
		const data = piece.data();
		const normalizedName = data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		const noc = [normalizedName, data.opus, data.composer];
		const nameArray = normalizedName.split(" ");
		const keywordsToSearch = noc.concat(nameArray);
		const searchables = {
			keywords: keywordsToSearch,
			// namecomposer: `${data.name} ${data.opus} ${data.composer}`,
			// composername: `${data.composer} ${data.name} ${data.opus}`,
			
			...data
		}
		console.log(searchables);
		return searchables;
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
