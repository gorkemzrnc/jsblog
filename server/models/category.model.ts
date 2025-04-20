import mongoose, { Document, Schema } from "mongoose";

export interface CategoryDocument extends Document {
  categoryName: string;
  active: boolean;
}

const CategorySchema: Schema = new Schema({
  categoryName: { type: String, required: true, unique: true },
  active: { type: Boolean, required: true, default: false }
});

const CategoryModel =  mongoose.model<CategoryDocument>("Category", CategorySchema);

export default CategoryModel;