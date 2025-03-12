import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk"
import { invariant500 } from "common"

const { NETWORK = Network.TESTNET } = process.env

const network = [
	{
		key: "bardock",
		network: Network.CUSTOM,
		fullnode: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
		indexer: "https://indexer.testnet.movementnetwork.xyz/v1/graphql",
		explorer: "https://explorer.movementlabs.xyz",
	},
	{
		key: "mainnet",
		network: Network.MAINNET,
		fullnode: "https://mainnet.movementnetwork.xyz/v1",
		indexer: "https://indexer.mainnet.movementnetwork.xyz/v1/graphql",
		explorer: "https://explorer.movementlabs.xyz",
	},
].find((net) => net.network === NETWORK)

invariant500(network)

const aptosConfig = new AptosConfig({
	network: network.network,
	fullnode: network.fullnode,
	indexer: network.indexer,
})

const aptos = new Aptos(aptosConfig)

export default aptos
