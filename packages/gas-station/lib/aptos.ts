import {
	Aptos,
	AptosConfig,
	Network,
} from "@aptos-labs/ts-sdk";

const { NETWORK = Network.TESTNET } = process.env;

const aptosConfig = new AptosConfig({ network: NETWORK });
const aptos = new Aptos(aptosConfig);

export default aptos
