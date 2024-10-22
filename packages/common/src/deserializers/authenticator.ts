import {
	AccountAuthenticator,
	Deserializer,
	Serializer,
} from "@aptos-labs/ts-sdk";

export class AuthenticatorDeserializer {
	auth: AccountAuthenticator;

	static fromBase64(base64: string) {
		const buffer = Buffer.from(base64, "base64");
		const bytes = new Uint8Array(buffer);
		const deserializer = new Deserializer(bytes);

		const auth = AccountAuthenticator.deserialize(deserializer);

		return new AuthenticatorDeserializer(auth);
	}

	constructor(auth: AccountAuthenticator) {
		this.auth = auth;
	}

	toBase64() {
		const serializer = new Serializer();

		this.auth.serialize(serializer);

		const bytes = serializer.toUint8Array();
		const base64 = Buffer.from(bytes).toString("base64");

		return base64;
	}
}
