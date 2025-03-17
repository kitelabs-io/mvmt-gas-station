import GasStationModel, { GasStation } from "@/models/gas-station"
import {
	Account,
	AccountAuthenticator,
	Ed25519PrivateKey,
} from "@aptos-labs/ts-sdk"
import { TransactionDeserializer, invariant400 } from "common"
import * as uuid from "uuid"

import aptos from "@/lib/aptos"

import { waitForDbConnection } from "./mongodb"

/**
 * Creates a new gas station.
 * @param network the blockchain network of gas station
 * @param sponsorId The ID of the sponsor.
 * @param predicateKind The kind of predicate.
 * @param predicateValue The value of the predicate.
 * @returns {Promise<{network: string, address: string; sponsorId: string; predicateKind: string; predicateValue: string }>} An object containing the created gas station's details.
 */
export async function createGasStation(
	network: string,
	sponsorId: string,
	predicateKind: string,
	predicateValue: string
): Promise<{
	network: string
	address: string
	sponsorId: string
	predicateKind: string
	predicateValue: string
}> {
	await waitForDbConnection()

	const stationId = uuid.v4()
	const account = Account.generate()
	const station = new GasStationModel({
		network,
		sponsorId,
		stationId,
		address: account.accountAddress.toString(),
		privateKeyEncrypted: account.privateKey.toString(),
		predicate: {
			kind: predicateKind,
			value: predicateValue,
		},
	})

	await station.save()

	return {
		network,
		address: station.address,
		sponsorId,
		predicateKind,
		predicateValue,
	}
}

/**
 * Sponsors a transaction for a gas station.
 * @param stationId The unique identifier for the gas station.
 * @param simpleTxBase64 The base64 encoded simple transaction to sponsor.
 * @returns {Promise<{feePayerAuthenticator: AccountAuthenticator, feePayerAddress: string}>} An object containing the fee payer authenticator and fee payer address.
 */
export async function sponsorTx(
	stationId: string,
	simpleTxBase64: string
): Promise<{
	feePayerAuthenticator: AccountAuthenticator
	feePayerAddress: string
}> {
	await waitForDbConnection()

	const station = await GasStationModel.findOne({ stationId })

	invariant400(station, "Station not found")

	// @TODO: encrypt private key
	const { address: feePayerAddress, privateKeyEncrypted: privateKey } = station

	const feePayer = Account.fromPrivateKey({
		privateKey: new Ed25519PrivateKey(privateKey),
	})

	const deserializer = TransactionDeserializer.fromBase64(simpleTxBase64)

	invariant400(
		station.matchEntryPredicate(deserializer.getEntryIdentifier()),
		"Invalid entry"
	)

	const feePayerAuthenticator = aptos.transaction.signAsFeePayer({
		signer: feePayer,
		transaction: deserializer.asSimple(),
	})

	return {
		feePayerAuthenticator,
		feePayerAddress,
	}
}

export async function getStationInfo(stationId: string): Promise<{
	stationAddress: string
	stationId: string
	stationPublicKey: string
}> {
	await waitForDbConnection()

	const station = await GasStationModel.findOne({ stationId })

	invariant400(station, "Station not found")

	const { privateKeyEncrypted: privateKey } = station

	const feePayer = Account.fromPrivateKey({
		privateKey: new Ed25519PrivateKey(privateKey),
	})

	return {
		stationId,
		stationAddress: feePayer.accountAddress.toString(),
		stationPublicKey: feePayer.publicKey.toString(),
	}
}

/**
 * Finds gas stations by network and sponsor ID.
 * @param network The blockchain network to search for.
 * @param sponsorId The ID of the sponsor to search for.
 * @returns {Promise<GasStation[]>} A promise that resolves to an array of gas station documents matching the network and sponsor ID.
 */
export async function findGasStations(
	network: string,
	sponsorId: string
): Promise<GasStation[]> {
	await waitForDbConnection()
	const data = await GasStationModel.find({ network, sponsorId }).exec()
	return data
}
