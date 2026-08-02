import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true, trim: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null },
  },
  { timestamps: true }
);

const pollSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["single", "yesno", "rating", "image", "open"],
      required: true,
    },
    options: [
      {
        text: String,
        image: String,
      },
    ],
    category: { type: String, default: "General", trim: true },
    closed: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    votes: [voteSchema],
    comments: [commentSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Poll || mongoose.model("Poll", pollSchema);
