import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./Product";

export interface IItem extends Document {
  _id: string;
  stock: number;
  size: string;
  productId: string;
}

export interface IItemPopulated extends Document {
  _id: string;
  stock: number;
  size: string;
  productId: IProduct;
}

export type PartialItem = Partial<IItem>;

const ItemSchema: Schema = new Schema(
  {
    stock: { type: Number, default: 0 },
    size: { type: String },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Item ||
  mongoose.model<IItem>("Item", ItemSchema);
