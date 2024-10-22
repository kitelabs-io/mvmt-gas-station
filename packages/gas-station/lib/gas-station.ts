import GasStationModel from "@/models/gas-station"
import {
	Account,
	AccountAuthenticator,
	Ed25519PrivateKey,
} from "@aptos-labs/ts-sdk"
import { TransactionDeserializer, invariant400 } from "common"
import * as uuid from "uuid"

import aptos from "@/lib/aptos"

import { connectToDatabase } from "./mongodb"

/**
 * Creates a new gas station.
 * @param sponsorId The ID of the sponsor.
 * @param predicateKind The kind of predicate.
 * @param predicateValue The value of the predicate.
 * @returns {Promise<{ address: string; sponsorId: string; predicateKind: string; predicateValue: string }>} An object containing the created gas station's details.
 */
export async function createGasStation(
	sponsorId: string,
	predicateKind: string,
	predicateValue: string
): Promise<{
	address: string
	sponsorId: string
	predicateKind: string
	predicateValue: string
}> {
	await connectToDatabase()

	const stationId = uuid.v4()
	const account = Account.generate()
	const station = new GasStationModel({
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

	return { address: station.address, sponsorId, predicateKind, predicateValue }
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
	await connectToDatabase()

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

/**
 * Finds gas stations by sponsor ID.
 * @param sponsorId The ID of the sponsor to search for.
 * @returns A promise that resolves to an array of gas station documents matching the sponsor ID.
 */
export async function findGasStationsBySponsorId(sponsorId: string) {
	await connectToDatabase()
	const data = await GasStationModel.find({ sponsorId }).exec()
	return data
}
