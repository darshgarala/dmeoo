import mongoose from "mongoose";

const storySchema = mongoose.Schema(
  {
    userId: { type: String, require: true },
    desc: String,
    likes: [],
    image: String,
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "10s" },
    },
  },
  { timestamps: true }
);

const StoryModel = mongoose.model("story", storySchema);

export default StoryModel;

// createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 7 },
