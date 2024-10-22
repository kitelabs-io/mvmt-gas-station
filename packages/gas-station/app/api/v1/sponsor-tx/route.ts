import { headers } from "next/headers"
import { z } from "zod"

import { sponsorTx } from "@/lib/gas-station"
import { AuthenticatorDeserializer } from "common"

const requestSchema = z.object({
  stationId: z.string().min(1),
  simpleTxBase64: z.string().min(1),
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

export const POST = errorHandler(async (request: Request) => {
  const body = await request.json()
  const { stationId, simpleTxBase64 } = requestSchema.parse(body)

  const {
      feePayerAuthenticator,
      feePayerAddress,
  } = await sponsorTx(stationId, simpleTxBase64)

  return JSON.stringify({
    feePayerAuthenticator: new AuthenticatorDeserializer(feePayerAuthenticator).toBase64(),
    feePayerAddress,
  })
})
