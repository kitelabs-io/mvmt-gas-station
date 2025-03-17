import { headers } from "next/headers"
import { z } from "zod"

import { getStationInfo } from "@/lib/gas-station"

const requestSchema = z.object({
	stationId: z.string().min(1),
})

const errorHandler = (handler: (request: Request) => Promise<string>) => {
	return async (request: Request) => {
		const headersList = headers()
		const referer = headersList.get("referer") ?? ""

		try {
			const data = await handler(request)
			return new Response(data, {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					referer: headers().get("referer") ?? "",
				},
			})
		} catch (error: any) {
			if (error instanceof z.ZodError) {
				return new Response(JSON.stringify({ error: error.errors }), {
					status: 400,
					headers: {
						"Content-Type": "application/json",
						referer: referer,
					},
				})
			}
			console.error(error)
			return new Response(
				JSON.stringify({ error: "Invalid request", message: error.message }),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
						referer: referer,
					},
				}
			)
		}
	}
}

export const GET = errorHandler(async (request: Request) => {
	const { searchParams } = new URL(request.url)
	const { stationId } = requestSchema.parse({
		stationId: searchParams.get("stationId") ?? "",
	})

	const data = await getStationInfo(stationId)

	return JSON.stringify(data)
})
