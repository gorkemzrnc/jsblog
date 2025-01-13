import mongoose, { Schema, Document } from 'mongoose';

export interface CommentDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export const CommentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  content: {
    type: String, required: true
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<CommentDocument>('Comment', CommentSchema);