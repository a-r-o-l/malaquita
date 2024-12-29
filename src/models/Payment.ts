import mongoose, { Schema, Document } from "mongoose";
import { ICustomer } from "./Customer";
import { IAccount } from "./Account";
import { ISale } from "./Sale";

export interface IPayment extends Document {
  _id: string;
  date: Date;
  pay: number;
  sale: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  account: mongoose.Types.ObjectId;
}

export interface IPaymentWP extends Document {
  _id: string;
  date: Date;
  pay: number;
  sale: ISale;
  customer: ICustomer;
  account: IAccount;
}

export type PartialPayment = Partial<IPayment>;

const PaymentSchema: Schema = new Schema(
  {
    date: { type: Date, required: true },
    pay: { type: Number, required: true },
    sale: { type: Schema.Types.ObjectId, ref: "Sale" },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.models.Payment ||
  mongoose.model<IPayment>("Payment", PaymentSchema);
