import mongoose, { Document, Schema } from "mongoose";
import { CommentSchema as Comment, CommentDocument } from "./comment.model";

export interface PostDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  category: mongoose.Schema.Types.ObjectId[];
  likes: mongoose.Schema.Types.ObjectId[];
  comments: CommentDocument[];
  createdAt: Date;
  thumbnailImage: string;
}

const PostSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  title: {
    type: String, required: true,
  },
  content: {
    type: String, required: true
  },
  category: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  comments: [Comment],
  thumbnailImage: { type: String },
}, { timestamps: true })

export default mongoose.model<PostDocument>("Post", PostSchema);