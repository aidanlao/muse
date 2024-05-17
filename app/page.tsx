
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
		var nameArray;

		// Add the genre and key as separate when applicable
		if (normalizedName.includes("in")) {
			nameArray = normalizedName.split(" in ");

			// Add combos of genre+composer vice versa
			const genreWithNumber = nameArray[0];
			var genre;
			if (genreWithNumber.includes("no") || genreWithNumber.includes("No")) {
				genre = genreWithNumber.split(" ")[0];
			} else {
				genre = genreWithNumber;
			}

			const genreComposer = `${genre} ${data.composer}`;
			const composerGenre = `${data.composer} ${genre}`;
			const genreNumberComposer = `${genreWithNumber} ${data.composer}`;
			const composerGenreNumber = `${data.composer} ${genreWithNumber}`
			// to do ? https://stackoverflow.com/questions/39927452/recursively-print-all-permutations-of-a-string-javascript#:~:text=To%20print%20them%2C%20just%20iterate%20over%20the%20array,print%28permutation%29%20%2F%2FUse%20the%20output%20method%20of%20your%20choice
			// optimize to just generate all permutations of 
			// genre, composer, opus, number
			const genreOpus = `${genre} ${data.opus}`;
			const opusGenre = `${data.opus} ${genre}`;
			const opusGenreComposer = `${data.opus} ${genre} ${data.composer}`;
			const genreOpusComposer = `${genre} ${data.opus} ${data.composer}`;
			const composerGenreOpus = `${data.composer} ${genre} ${data.opus}`;
			const composerOpusGenre = `${data.composer} ${data.opus} ${genre}`;
			nameArray.push(genreOpus);
			nameArray.push(opusGenre);
			nameArray.push(opusGenreComposer);
			nameArray.push(genreOpusComposer);
			nameArray.push(genreComposer);
			nameArray.push(composerGenre);
			nameArray.push(genreNumberComposer);
			nameArray.push(composerGenreNumber);
			nameArray.push(composerGenreOpus);
			nameArray.push(composerOpusGenre);

		} else {
			nameArray = normalizedName.split(" ");
		}
		
		const keywordsToSearch = noc.concat(nameArray);
		const searchables = {
			keywords: keywordsToSearch,
			opuscomposer: `${data.opus} ${data.composer}`,
			composeropus: `${data.composer} ${data.opus}`,
			name: data.name,
			...data
		}
		if (!searchables.name.includes("Sonata")){
			
		console.log(searchables);
		}
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
