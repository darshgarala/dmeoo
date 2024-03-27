import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const secret = process.env.JWt_KEY;

const authmiddlewear = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    if (token) {
      const decode = jwt.verify(token, secret);
      console.log(decode);
      req.body._id = decode?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authmiddlewear;
