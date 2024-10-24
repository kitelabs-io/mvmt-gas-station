"use client"

import { networks } from "@/lib/network"
import { useNetwork } from "@/hooks/use-network"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"

export default function NetworkSwitch() {
	const [selectedNetwork, setNetwork] = useNetwork()
	return (
		<Select value={selectedNetwork} onValueChange={setNetwork}>
			<SelectTrigger className="w-[160px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{networks.map((network) => (
					<SelectItem key={network.value} value={network.value}>
						{network.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
