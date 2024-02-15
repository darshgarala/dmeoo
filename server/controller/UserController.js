import express from "express";
import UserModel from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import PostModel from "../model/postModel.js";

export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res
        .status(200)
        .send({ message: "user find successfully", data: otherDetails });
    } else {
      res.status(404).send({ message: "user not find " });
    }
  } catch (error) {
    res.status(500).send({ message: "some error accure" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log("data = ", req.body);
  console.log("id = ", id);
  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("user", user);

    const dataUpdate = await PostModel.find({ userId: id }).updateOne({
      userProfileImage: req.body.profilePicture,
    });

    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    console.log("yes");

    let AllPost = await PostModel.find({});

    for (let i = 0; i < AllPost.length; i++) {
      let post1 = AllPost[i];

      post1.comments = post1.comments.map((comment) => {
        if (comment.name === user.username) {
          comment.profileImg = req.body?.profilePicture;
        }
        return comment;
      });

      await post1.save();
    }

    return res
      .status(200)
      .send({ message: "update user data successfully", data: user });
  } catch (error) {
    res.status(500).send({ message: "some error accure" });
  }
  // const { _id, currentUserAdminStatus, password } = req.body.data;
  // if()
  // if (id == req.body.data._id) {
  //   try {
  //     const user = await UserModel.findByIdAndUpdate(id, req.body, {
  //       new: true,
  //     });

  //     const dataUpdate = await PostModel.find({ userId: _id }).updateOne({
  //       userProfileImage: req.body.profilePicture,
  //     });
  // const data = {
  //   profileImg: req.body.profilePicture,
  // };
  // const AllPost = await PostModel.find({});

  // const newData = await PostModel.updateMany(
  //   { comments: { name: req.body.username } },
  //   {
  //     $set: { comments: { profileImg: req.body.profilePicture } },
  //   }
  // );

  // console.log("newData=>  ", newData);

  // const token = jwt.sign(
  //   { username: user.username, id: user._id },
  //   process.env.JWT_KEY,
  //   { expiresIn: "1h" }
  // );
  // console.log("user", user);

  //     return res
  //       .status(200)
  //       .send({ message: "update user data successfully", data: user });
  //   } catch (error) {
  //     res.status(500).send({ message: "some error accure" });
  //   }
  // } else {
  //   res
  //     .status(500)
  //     .send({ message: "access denied! you can update your own profile." });
  // }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (id === currentUserId || currentUserAdminStatus) {
    try {
      const user = await UserModel.findByIdAndDelete(id);

      res.status(200).send({ message: "delete user successfully" });
    } catch (error) {
      res.status(500).send({ message: "some error accure" });
    }
  } else {
    res
      .status(500)
      .send({ message: "access denied! you can delete your own profile." });
  }
};

export const followUser = async (req, res) => {
  const currentLoggedInId = req.body.currentLoggedInId;
  const id = req.params.id;

  console.log(currentLoggedInId, id);

  try {
    // current LoggedIn User
    const user = await UserModel.findById({ _id: currentLoggedInId });
    // console.log(data);

    // console.log(id);
    const temp = [...user.followings, id];

    user.followings = temp;
    await user.save();

    const followingUser = await UserModel.findById({ _id: id });
    // console.log(followingUser);

    // console.log(id);
    const temp1 = [...followingUser.followers, currentLoggedInId];

    followingUser.followers = temp1;
    await followingUser.save();

    res.status(200).send({ message: "user followed!" });
  } catch (error) {
    res.status(400).send({ message: "some error accure" });
  }

  // const id = req.params.id;
  // const { _id } = req.body; // this id is login user id
  // console.log(req.body);
  // console.log(id);
  // console.log("follow");
  // if (_id === id) {
  //   res.status(403).send({ message: "action forbidden" });
  // } else {
  //   try {
  //     const followUser = await UserModel.findById(id);
  //     const followingUser = await UserModel.findById(_id);

  //     if (!followUser.followers.includes(_id)) {
  //       await followUser.updateOne({ $push: { followers: _id } });
  //       await followingUser.updateOne({ $push: { followings: id } });
  //       res.status(200).send({ message: "user followed!" });
  //     } else {
  //       res.status(403).send({ message: "user already followed by you" });
  //     }
  //   } catch (error) {
  //     res.status(400).send({ message: "some error accure" });
  //   }
  // }
};

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentLoggedInId } = req.body;

  try {
    const user = await UserModel.findById({ _id: currentLoggedInId });

    const temp = user.followings.filter((item) => {
      return item != id;
    });

    user.followings = temp;
    await user.save();

    const followingUser = await UserModel.findById({ _id: id });

    const temp1 = followingUser.followers.filter((item) => {
      return item != currentLoggedInId;
    });

    followingUser.followers = temp1;
    await followingUser.save();

    res.status(200).send({ message: "user unFollowed!" });
  } catch (error) {
    res.status(400).send({ message: "some error accure" });
  }

  // console.log("unfollow");
  // if (_id === id) {
  //   res.status(403).send({ message: "action forbidden" });
  // } else {
  //   try {
  //     const followUser = await UserModel.findById(id);
  //     const followingUser = await UserModel.findById(_id);

  //     if (followUser.followers.includes(_id)) {
  //       await followUser.updateOne({ $pull: { followers: _id } });
  //       await followingUser.updateOne({ $pull: { followings: id } });
  //       res.status(200).send({ message: "user unFollowed!" });
  //     } else {
  //       res.status(403).send({ message: "user is not followed by you" });
  //     }
  //   } catch (error) {
  //     res.status(400).send({ message: "some error accure" });
  //   }
  // }
};

export const searchUser = async (req, res) => {
  console.log("object", req.body);
  let userIs = RegExp("^" + req.body.query);
  try {
    const data = await UserModel.find({ username: { $regex: userIs } }).select(
      "_id username"
    );
    res.status(200).send({ message: "search data", data: data });
  } catch (error) {
    res.status(400).send({ message: "error for search" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    // console.log(users);
    res.status(200).send({ messsage: "All user Find ", data: users });
  } catch (error) {
    res.status(400).send({ messsage: "Not All user Find ", error });
  }
};
