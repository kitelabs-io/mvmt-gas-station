import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const { NETWORK = "testnet" } = process.env

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function linkToWallet(address: string) {
  return `https://explorer.aptoslabs.com/account/${address}?network=${NETWORK}`
}
