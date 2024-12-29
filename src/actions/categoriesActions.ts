"use server";

import dbConnect from "@/lib/mongoose";
import models from "@/models/index";
import { revalidatePath } from "next/cache";

export const getAllCategories = async () => {
  await dbConnect();
  const categories = await models.Category.find({});
  return categories.map((cat) => JSON.parse(JSON.stringify(cat)));
};

export const createCategory = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());
  const newCategory = new models.Category({
    name: formData.name,
    icon: formData.icon,
  });
  await newCategory.save();
  revalidatePath("dashboard/settings/categories");
  return JSON.parse(JSON.stringify(newCategory));
};

export const deleteCategory = async (id: string) => {
  await dbConnect();
  await models.Category.findByIdAndDelete(id);
  revalidatePath("/dashboard/settings/categories");
  return { message: "category deleted" };
};
