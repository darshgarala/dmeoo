import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const Connection = async () => {
  const dataUrl = process.env.MONGODB_URL;
  mongoose
    .connect(dataUrl, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(" =  = == ", err));
};

export default Connection;
