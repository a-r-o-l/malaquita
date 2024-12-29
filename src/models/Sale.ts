import mongoose, { Schema, Document } from "mongoose";
import { ICustomer } from "./Customer";
import { IAccount } from "./Account";

export interface ISale extends Document {
  _id: string;
  date: Date;
  accountId: mongoose.Types.ObjectId;
  type: string;
  total: number;
  items: mongoose.Types.ObjectId[];
  customerId: mongoose.Types.ObjectId;
  pay: number;
}

export interface ISaleWPop extends Document {
  _id: string;
  date: Date;
  accountId: IAccount;
  type: string;
  total: number;
  items: mongoose.Types.ObjectId[];
  customerId: ICustomer;
  pay: number;
}

export type PartialSale = Partial<ISale>;

const SaleSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    type: { type: String, required: true },
    total: { type: Number, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
    customerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    pay: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Sale ||
  mongoose.model<ISale>("Sale", SaleSchema);
