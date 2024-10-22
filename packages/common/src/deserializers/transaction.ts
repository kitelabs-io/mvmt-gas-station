import {
	Deserializer,
	RawTransaction,
	SimpleTransaction,
	TransactionPayloadEntryFunction,
} from "@aptos-labs/ts-sdk";
import { invariant400 } from "../utils/invariant";

export class TransactionDeserializer {
	private rawTx: SimpleTransaction;

	static fromBase64(base64: string) {
		const buffer = Buffer.from(base64, "base64");
		const bytes = new Uint8Array(buffer);

		return TransactionDeserializer.fromBytes(bytes);
	}

	static fromBytes(bytes: Uint8Array) {
		const deserializer = new Deserializer(bytes);
		const simpleTx = SimpleTransaction.deserialize(deserializer);
		return new TransactionDeserializer(simpleTx);
	}

	constructor(private readonly tx: SimpleTransaction) {
		this.rawTx = tx;
	}

	getRawTransaction() {
		return this.rawTx;
	}

	asSimple(): SimpleTransaction {
		return this.rawTx;
	}

	getPayload() {
		return this.rawTx.rawTransaction.payload;
	}

	getEntryIdentifier() {
		const payload = this.getPayload();

		invariant400(
			payload instanceof TransactionPayloadEntryFunction,
			"payload is not an EntryFunction",
		);

		const { module_name, function_name, type_args } = payload.entryFunction;

		return [
			module_name.address.toString(),
			module_name.name.identifier,
			function_name.identifier,
			type_args.length
				? `<${type_args.map((arg) => arg.toString()).join(", ")}>`
				: "",
		]
			.filter(Boolean)
			.join("::");
	}
}
