import mongoose, { Schema, Document } from "mongoose";
import { PartialCategory } from "./Category";

export interface IProduct extends Document {
  _id: string;
  code: string;
  name: string;
  description: string;
  category: PartialCategory;
  costPrice: number;
  price: number;
  color: string;
  stock?: number;
  uniqueSize?: boolean;
  size?: string;
  imageUrl: string;
}

export type PartialProduct = Partial<IProduct>;

export const ProductSchema: Schema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    costPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    color: { type: String },
    stock: { type: Number, default: 0 },
    uniqueSize: { type: Boolean, default: false },
    size: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
