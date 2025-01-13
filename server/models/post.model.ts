import mongoose, { Document, Schema } from "mongoose";
import { CommentSchema as Comment, CommentDocument } from "./comment.model";

export interface PostDocument extends Document {
  title: string;
  content: string;
  category: mongoose.Schema.Types.ObjectId;
  likes: mongoose.Schema.Types.ObjectId[];
  comments: CommentDocument[];
  createdBy: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  thumbnailImage: string;
  postImages?: mongoose.Schema.Types.ObjectId[];
}

const PostSchema = new Schema({
  title: {
    type: String, required: true,
  },
  content: {
    type: String, required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  }],
  comments: [Comment],
  thumbnailImage: { type: String, required: true },
  postImages: [{ type:mongoose.Schema.Types.ObjectId, ref: 'PostImages' }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
}, { timestamps: true })

export default mongoose.model<PostDocument>("Post", PostSchema);