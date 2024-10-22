import { PredicateType } from "@/constants/predicate"
import mongoose from "mongoose"

const GasStationSchema = new mongoose.Schema(
	{
		sponsorId: { type: String, required: true },
		stationId: { type: String, required: true },
		predicate: {
			type: { kind: String, value: String },
			required: true,
		},
		address: { type: String, required: true },
		privateKeyEncrypted: { type: String, required: true },
	},
	{
		methods: {
			/**
			 * Checks if the predicate matches the given identifier.
			 * @param identifier - The identifier to match against.
			 * @returns True if the predicate matches the identifier, false otherwise.
			 */
			matchEntryPredicate(identifier: string): boolean {
				const { kind, value } = this.predicate

				if (!kind || !value) {
					return false
				}

				switch (kind) {
					case PredicateType.Entry:
						return value === identifier
					case PredicateType.Module:
						return identifier.startsWith(value)
					case PredicateType.Address:
						return identifier.split("::")[0] === value
					default:
						return false
				}
			},
		},
	}
)

export type GasStation = mongoose.InferSchemaType<typeof GasStationSchema>

interface GasStationMethods {
	matchEntryPredicate(identifier: string): boolean
}

const GasStationModel: mongoose.Model<GasStation, {}, GasStationMethods> =
	mongoose.models.GasStation || mongoose.model("GasStation", GasStationSchema)

export default GasStationModel
