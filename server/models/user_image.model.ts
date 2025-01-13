import mongoose, { Document, Schema } from "mongoose";

export interface UserImagesDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  image_url: string;
}

const UserImageSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  image_url: { type: String, required: true, unique: true }
});

const UserImageModel = mongoose.model<UserImagesDocument>("PostImage", UserImageSchema);

export default UserImageModel;