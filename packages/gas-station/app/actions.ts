"use server"

import { createGasStation } from "@/lib/gas-station"
import { revalidatePath } from "next/cache"

export async function registerGasStation({
  sponsorId,
  predicateType,
  predicateValue,
}: {
  sponsorId: string
  predicateType: string
  predicateValue: string
}) {
  await createGasStation(sponsorId, predicateType, predicateValue)

  revalidatePath("/gas-station")
}
