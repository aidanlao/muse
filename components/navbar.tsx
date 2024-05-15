'use client'
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import Link from "next/link"
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
	LightLogo,
} from "@/components/icons";

import { Logo } from "@/components/icons";

export const Navbar = () => {
	const [ isMenuOpen, setIsMenuOpen ] = useState(false);
	
	return (
		<NextUINavbar
		isMenuOpen={isMenuOpen}
		onMenuOpenChange={setIsMenuOpen} 
		maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo  className="dark:hidden"/>
						<LightLogo className="hidden dark:block"/>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden sm:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"font-light"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
				<ThemeSwitch />
			</NavbarContent>

			{/* <NavbarContent
				className="flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="flex">{searchInput}</NavbarItem>

			</NavbarContent> */}

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								onClick={()=> setIsMenuOpen(false)}
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href={item.href}
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
