import mongoose, { Schema, Document } from "mongoose";

export interface IAccount extends Document {
  _id: string;
  username: string;
  password: string;
  role: string;
  imageUrl?: string;
}

export type PartialAccount = Partial<IAccount>;

const AccountSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    imageUrl: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.models.Account ||
  mongoose.model<IAccount>("Account", AccountSchema);
