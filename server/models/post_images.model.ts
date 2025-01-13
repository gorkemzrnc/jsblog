import mongoose, { Document, Schema } from "mongoose";

export interface PostImagesDocument extends Document {
  postId: mongoose.Schema.Types.ObjectId;
  image_url: string;
}

const PostImageSchema: Schema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  image_url: { type: String, required: true, unique: true }
});

const PostImageModel = mongoose.model<PostImagesDocument>("PostImage", PostImageSchema);

export default PostImageModel;