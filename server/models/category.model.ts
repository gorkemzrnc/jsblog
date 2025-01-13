import mongoose, { Document, Schema } from "mongoose";

export interface CategoryDocument extends Document {
  categoryName: string;
}

const CategorySchema: Schema = new Schema({
  categoryName: { type: String, required: true, unique: true }
});

const CategoryModel =  mongoose.model<CategoryDocument>("Category", CategorySchema);

export default CategoryModel;