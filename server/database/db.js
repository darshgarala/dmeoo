import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connection = async () => {
  const dataUrl = process.env.MONGODB_URL;

  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5t7rnw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
      // "mongodb://localhost:27017/social",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    )
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(" =  = == ", err));
};

export default Connection;
