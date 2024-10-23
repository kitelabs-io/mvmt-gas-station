import React from "react"
import { redirect } from "next/navigation"
import { PageProps } from "@/.next/types/app/page"
import { auth } from "@/auth"

import { findGasStations } from "@/lib/gas-station"
import { linkToWallet } from "@/lib/network"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Typography } from "@/components/ui/typography"
import CopyButton from "@/components/copy-button"
import NewStationForm from "@/components/new-station-form"

export default async function GasStationPage({
	searchParams: { network },
}: PageProps) {
	const { userId: sponsorId } = (await auth()) || {}

	if (!sponsorId) {
		redirect("/login")
	}

	const data = network ? await findGasStations(network, sponsorId) : []

	return (
		<section className="container grid justify-center gap-4 pb-8 pt-6 md:py-10">
			<div
				className={cn(
					"flex flex-col",
					data.length == 0
						? "h-[600px] w-[400px] items-center justify-center gap-3"
						: "items-end"
				)}
			>
				{data.length == 0 && (
					<Typography.Muted className="text-xl">
						No stations registered yet
					</Typography.Muted>
				)}
				<NewStationForm sponsorId={sponsorId} />
			</div>

			{data.map(({ stationId, address, predicate }) => {
				return (
					<Card className="max-w-4xl" key={stationId}>
						<CardHeader>
							<CardTitle>
								# <CopyButton text={stationId} />
							</CardTitle>
						</CardHeader>

						<CardContent className="grid grid-cols-5 gap-2">
							<div className="col-span-1">address:</div>
							<div className="col-span-4">
								<a
									href={linkToWallet(address, network)}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-500 underline"
								>
									{address}
								</a>
							</div>
							{Object.entries({
								predicateType: predicate.kind,
								predicateValue: predicate.value,
							}).map(([key, value]) => (
								<React.Fragment key={key}>
									<div className="col-span-1">{key}:</div>
									<div className="col-span-4">
										<Typography.Code>{value}</Typography.Code>
									</div>
								</React.Fragment>
							))}
						</CardContent>
					</Card>
				)
			})}
		</section>
	)
}
