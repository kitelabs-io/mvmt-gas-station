import { Network } from "@aptos-labs/ts-sdk"

export const networks = [
	{
		value: "suzuka-testnet",
		label: "Suzuka Testnet",
		explorerUrl: "https://explorer.movementnetwork.xyz",
		type: Network.TESTNET,
	},
	{
		value: "porto-testnet",
		label: "Porto Testnet",
		explorerUrl: "https://explorer.testnet.porto.movementnetwork.xyz",
		type: Network.TESTNET,
	},
]

export function getDefaultNetwork() {
	return networks[0]
}

export function linkToWallet(address: string, network: string) {
	const { explorerUrl, type } =
		networks.find((net) => net.value == network) || getDefaultNetwork()
	return `${explorerUrl}/account/${address}?network=${type}`
}
