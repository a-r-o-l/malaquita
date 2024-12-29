import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  _id: string;
  name: string;
  icon: string;
  totalProducts: string;
}

export type PartialCategory = Partial<ICategory>;

const CategorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    totalProducts: { type: Number },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
