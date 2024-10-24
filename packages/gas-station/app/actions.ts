"use server"

import { revalidatePath } from "next/cache"

import { createGasStation } from "@/lib/gas-station"

export async function registerGasStation({
	network,
	sponsorId,
	predicateType,
	predicateValue,
}: {
	network: string
	sponsorId: string
	predicateType: string
	predicateValue: string
}) {
	await createGasStation(network, sponsorId, predicateType, predicateValue)

	revalidatePath("/gas-station")
}
