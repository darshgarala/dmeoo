import PostModel from "../model/postModel.js";
import mongoose from "mongoose";
import UserModel from "../model/userModel.js";
import fs from "fs";
import StoryModel from "../model/storyModel.js";
// create post
export const createPost = async (req, res) => {
  console.log(req.body);
  const newPost = new PostModel(req.body);
  try {
    await newPost.save();
    res.status(200).send({ message: "post created!", data: newPost });
  } catch (error) {
    res.status(500).send({ message: "some error accure." });
  }
};

export const createImgStory = async (req, res) => {
  // console.log(" = ", req.body.img);
  // const image = req.body.img;
  const newPost = new StoryModel(req.body);
  try {
    console.log("story");
    await newPost.save();
    res.status(200).send({ message: "story created!", data: newPost });
  } catch (error) {
    res.status(500).send({ message: "some error accure." });
  }
};
// getAllPost
export const getAllPost = async (req, res) => {
  try {
    const post = await PostModel.find({});
    res.status(200).send({ message: "get all user all posts", data: post });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "some error accure." });
  }
};

// find post
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModel.findById(id);
    res.status(200).send({ message: "get all posts", data: post });
  } catch (error) {
    res.status(500).send({ message: "some error accure." });
  }
};

//update post

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).send({ message: "post upadted..." });
    } else {
      res.status(403).send({ message: "action forbidden" });
    }
  } catch (error) {
    res.status(500).send({ message: "some error accure." });
  }
};

// delete post

export const datelePost = async (req, res) => {
  const id = req.params.id; //post id
  // console.log(" userid ==> ", req.body);
  const { userId } = req.body;
  console.log("Delete ==> ", id);
  try {
    const post = await PostModel.findById(id);
    // console.log("id = ", id, " userId =", userId);
    if (post.userId === userId) {
      await post.deleteOne({ _id: id });
      console.log("img = ", post.image);
      fs.unlink(`public/images/${post.image}`, (err) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "error for image delete local storage" });
        }
      });

      const allpostdata = await PostModel.find({});
      // data = data.json();
      res
        .status(200)
        .send({ message: "post delete successfully", data: allpostdata });
    } else {
      res.status(403).send({ message: "action forbidden" });
    }
  } catch (error) {
    res.status(500).send({ message: "some error accures." });
  }
  return;
};

// like unlike post

export const like = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).send({ message: "post liked!" });
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).send({ message: "post unliked!" });
    }
  } catch (error) {
    res.status(500).send({ message: "some error accure." });
  }
};

// timeline

export const timeline = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "followings",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).send({
      message: "timeline",
      data: currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        }),
    });
  } catch (error) {
    res.status(500).send({ message: "some error accures." });
  }
};

export const Comments = async (req, res) => {
  const id = req.params.id;
  // console.log("object", req.body.userId);
  // console.log("object", req.body.text);
  console.log("object", req.body);
  const data = {
    text: req.body.text,
    postedBy: req.params.id,
    makeBy: req.body.userId,
    name: req.body.username,
    profileImg: req.body.profileImg,
  };

  // console.log("data", data);
  try {
    const s = await PostModel.findByIdAndUpdate(
      { _id: id },
      { $push: { comments: data } }
    );
    res.status(200).send({ message: "comment added successfully" });
  } catch (error) {
    res.status(400).send({ message: "error", data: error });
  }
};
