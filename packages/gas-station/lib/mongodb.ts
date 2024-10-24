import mongoose from "mongoose"

let isConnected = false

export const waitForDbConnection = async () => {
	if (isConnected) {
		return
	}

	try {
		const { MONGODB_URI } = process.env

		const db = await mongoose.connect(MONGODB_URI, { dbName: "gas-station" })

		isConnected = true

		return db
	} catch (error) {
		console.error("Error connecting to MongoDB", error)
		throw new Error("Error connecting to MongoDB")
	}
}
