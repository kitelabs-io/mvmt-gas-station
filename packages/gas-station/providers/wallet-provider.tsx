"use client"

import { AptosWalletProvider } from "@razorlabs/wallet-kit"

import "@razorlabs/wallet-kit/style.css"
import { PropsWithChildren } from "react"

export default function WalletProvider({ children }: PropsWithChildren) {
	return <AptosWalletProvider>{children}</AptosWalletProvider>
}
