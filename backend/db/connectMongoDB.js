import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		const dbc="mongodb://127.0.0.1:27017/twix-db";
		const conn = await mongoose.connect(dbc);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error connection to mongoDB: ${error.message}`);
		process.exit(1);
	}
};

export default connectMongoDB;
