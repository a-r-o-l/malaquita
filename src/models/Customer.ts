import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  _id: string;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  phone: string;
  address: string;
}

export type PartialCustomer = Partial<ICustomer>;

const CustomerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    dni: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);
