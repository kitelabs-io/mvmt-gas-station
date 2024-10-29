"use client"

import { useAptosWallet } from "@razorlabs/wallet-kit"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import ConnectWalletButton from "./connect-wallet-button"
import GithubButton from "./github-button"
import NetworkSwitch from "./network-switch"

export function SiteHeader() {
	const { connected, ...wallet } = useAptosWallet()

	const isLoggedIn = connected

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<MainNav
					items={siteConfig.mainNav.filter((item) => item.public || isLoggedIn)}
				/>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-2">
						<NetworkSwitch />
						<GithubButton />
						<ThemeToggle />
						<ConnectWalletButton className="flex h-11 w-[200px] items-center justify-center rounded-lg bg-yellow-400 hover:bg-yellow-400 hover:opacity-90">
							Connect Wallet
						</ConnectWalletButton>
					</nav>
				</div>
			</div>
		</header>
	)
}
