import { auth, signOut } from "@/auth"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import GithubButton from "./github-button"
import NetworkSwitch from "./network-switch"

export async function SiteHeader() {
	const session = await auth()

	const isLoggedIn = !!session?.user

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav
					items={siteConfig.mainNav.filter((item) => item.public || isLoggedIn)}
				/>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						<NetworkSwitch />
						<GithubButton />
						<ThemeToggle />
						{isLoggedIn && (
							<form
								action={async () => {
									"use server"
									await signOut({ redirectTo: "/login" })
								}}
							>
								<button type="submit">Logout</button>
							</form>
						)}
					</nav>
				</div>
			</div>
		</header>
	)
}
