import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profile: { type: Boolean, default: true },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksAt: String,
    relationship: String,
    country: String,
    followers: [],
    followings: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
