"use server";

import dbConnect from "@/lib/mongoose";
import models from "@/models/index";
import { revalidatePath } from "next/cache";

export const getAllAccounts = async () => {
  await dbConnect();
  const accounts = await models.Account.find({}).lean();
  return accounts.map((acc) => JSON.parse(JSON.stringify(acc)));
};
export const getAccount = async (id: string) => {
  await dbConnect();
  const account = await models.Account.findOne({ _id: id }).lean();
  return JSON.parse(JSON.stringify(account));
};

export const createAccount = async (data: FormData) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const newAccount = new models.Account({
      username: formData.username,
      password: formData.password,
      role: formData.role,
      imageUrl: formData.imageUrl,
    });
    await newAccount.save();
    revalidatePath("/settings/accounts");
    return {
      success: true,
      message: "Cuenta creada satisfactoriamente",
      product: JSON.parse(JSON.stringify(newAccount)),
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: "Error al crear el producto, intente nuevamente",
    };
  }
};

export const EditAccount = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());
  const updatedAccount = await models.Account.findByIdAndUpdate(
    formData.id,
    {
      username: formData.username,
      pasword: formData.pasword,
      role: formData.role,
    },
    { new: true }
  );

  if (!updatedAccount) {
    return { success: false, message: "Account not found" };
  }

  revalidatePath("/settings/accounts");
  return { success: true, product: JSON.parse(JSON.stringify(updatedAccount)) };
};

export const deleteAccount = async (id: string) => {
  await dbConnect();
  await models.Account.findByIdAndDelete(id).lean();
  revalidatePath("/settings/accounts");
  return { message: "Account deleted" };
};
