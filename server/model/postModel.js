import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const postSchema = mongoose.Schema(
  {
    userId: { type: String, require: true },
    desc: String,
    likes: [],
    image: String,
    userProfileImage: String,
    username: String,

    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
        makeBy: { type: ObjectId },
        name: String,
        profileImg: String,
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Posts", postSchema);

export default PostModel;
