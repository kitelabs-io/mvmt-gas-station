import Link from "next/link"

import { Button } from "@/components/ui/button"

export default async function IndexPage() {
	return (
		<section className="container grid max-w-3xl items-center gap-6 pb-8 pt-6 md:py-10">
			<div className="flex max-w-[980px] flex-col items-start gap-2">
				<h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
					Welcome to Movement Gas Station
				</h1>
				<p className="max-w-[700px] text-lg text-muted-foreground">
					Bringing gas stations to your dApp with ease in the Movement network.
				</p>
			</div>
			<div className="flex flex-col gap-4 md:max-w-[700px]">
				<p>
					Gas stations handle transaction fees, allowing users to interact with
					smart contracts without gas costs. Enabling sponsors to create and
					manage gas stations, enhancing user experiences in dApps.
				</p>
			</div>

			<div className="flex gap-4">
				<Link href="/gas-station">
					<Button>Manage Gas Stations</Button>
				</Link>
				<Link
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/kitelabs-io/mvmt-gas-station/blob/main/docs/getting-started/index.mdx"
				>
					<Button variant="outline">Getting Started</Button>
				</Link>
			</div>
		</section>
	)
}
