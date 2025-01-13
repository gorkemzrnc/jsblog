import mongoose, { Schema } from "mongoose";
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId,
  expiresAt: Date,
  createdAt: Date
}

const SessionSchema = new Schema<SessionDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  expiresAt: { type: Date, default: thirtyDaysFromNow },
  createdAt: { type: Date, required: true, default: Date.now }
});

const SessionModel = mongoose.model("Session", SessionSchema);

export default SessionModel