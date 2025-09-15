import mongoose from "mongoose";

process.loadEnvFile();

const connectionString =  process.env.MONGO_URL || "";

export const db = mongoose.connect(connectionString)
                    .then(() => {
                        console.log("MongoDB connected");
                    })
                    .catch(
                        (error) => console.error("MongoDB connection error:", error));
