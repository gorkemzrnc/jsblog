import mongoose from "mongoose"
import { MONGODB_URI } from "../constants/env";

export const connectToDatabase = async ()=>{
  try {
    await mongoose.connect(MONGODB_URI);
  } catch(err){
  }
}