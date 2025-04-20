import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  username: string;
  password?: string;
  email: string;
  image: string;
  role: 'user' | 'admin';
  googleId?: string;
  authMethods: ('local' | 'google' | 'github')[];
  comparePassword(password: string): Promise<boolean>;
  omitPassword(): Pick<UserDocument, "username" | "email" | "image" | "role" | "createdAt" | "updatedAt">
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new mongoose.Schema<UserDocument>({
  username: { type: String, required: true },
  password: { 
    type: String, 
    required: function() {
      return this.authMethods.includes('local');
    } 
  },
  email: { type: String, required: true },
  googleId: { type: String, unique: true, sparse: true },
  image: { type: String, default: 'default' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  authMethods: { 
    type: [String], 
    enum: ['local', 'google', 'github'],
    default: ['local'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.authMethods.includes('local')) {
    return next();
  }
  if(this.password) this.password = await hashValue(this.password);
  return next();
});

UserSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

UserSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
