import UserModel from "../model/userModel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

// import JWT_KEY from ""

export const registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  req.body.password = hashPass;
  const newUser = new UserModel(req.body);

  try {
    const oldUser = await UserModel.findOne({ username: username });
    if (oldUser) {
      return res.status(200).send({ message: "username is already register" });
    }

    const user = await newUser.save();

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    // console.log("=>", user);
    // console.log("=>", token);

    res
      .status(200)
      .send({ message: "register successfully", data: user, token });
  } catch (error) {
    res.status(500).send({ message: "some error Accure" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username: username });
    if (user) {
      // console.log(password);
      console.log(user.password);
      const validity = await bcrypt.compare(password, user.password);
      console.log(validity);
      if (validity) {
        res.status(200).send({ meaasge: "login successfully", data: user });
      } else {
        res.status(400).send({ message: "Wrong password" });
      }
    } else {
      res.status(400).send({ message: "user does not exits" });
    }
  } catch (error) {
    res.status(500).send({ message: "some error accure" });
  }
};
