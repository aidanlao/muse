
import Link from "next/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import Searchbar from "@/components/Searchbar";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title({ color: "violet" })}>Learn&nbsp;</h1>
				<br />
				<h1 className={title()}>
					about your favorite composers and pieces
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					The best place for classical music analysis.</h2>
			</div>

			<div className="w-full">
				
				<Searchbar />
			</div>

		</section>
	);
}
