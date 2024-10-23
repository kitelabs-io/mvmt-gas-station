import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { getDefaultNetwork, networks } from "@/lib/network"

export function useNetwork() {
	const router = useRouter()
	const params = useSearchParams()
	const pathname = usePathname()

	const QUERY_KEY = "network"

	const selectedNetwork = params.get(QUERY_KEY)

	function setNetwork(value: string) {
		const newParams = new URLSearchParams(params)
		newParams.delete(QUERY_KEY)
		newParams.append(QUERY_KEY, value)
		router.push(`${pathname}?${newParams.toString()}`)
	}

	if (networks.every((n) => n.value !== selectedNetwork)) {
		setNetwork(getDefaultNetwork().value)
	}

	return [selectedNetwork!, setNetwork] as const
}
