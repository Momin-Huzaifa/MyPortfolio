import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/Signup";

const Hold = mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.log("Connection error:", error);
  });

export default Hold; // Make sure you export the connection
