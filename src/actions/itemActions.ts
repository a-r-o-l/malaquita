"use server";
import dbConnect from "@/lib/mongoose";
import { IItem } from "@/models/Item";
import { revalidatePath } from "next/cache";
import models from "@/models/index";

export const getAllItems = async () => {
  await dbConnect();
  const products = await models.Item.find({}).populate("productId").lean();
  return products.map((prod) => JSON.parse(JSON.stringify(prod)));
};

export const getItemsByProduct = async (productId: string) => {
  await dbConnect();
  const products = await models.Item.find({ productId }).lean();
  return products.map((prod) => JSON.parse(JSON.stringify(prod)));
};

export const createItem = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());
  const itemExist = await models.Item.findOne({
    productId: formData.productId,
    size: formData.size,
  });
  if (itemExist) {
    return { success: false, message: "Ya existe el talle en este producto." };
  }
  const newItem = new models.Item({
    stock: formData.stock,
    size: formData.size,
    productId: formData.productId,
  });
  await newItem.save();
  await models.Product.findByIdAndUpdate(
    formData.productId,
    { $inc: { totalStock: newItem.stock } },
    { new: true }
  );
  revalidatePath(`/dashboard/products/${formData.productId}`);
  return {
    data: JSON.parse(JSON.stringify(newItem)),
    success: true,
    message: "Item creado correctamente.",
  };
};

export const editItem = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());

  const itemExist = await models.Item.findOne({
    productId: formData.productId,
    size: formData.size,
    _id: { $ne: formData.id },
  });

  if (itemExist) {
    return { success: false, message: "Ya existe el talle en este producto." };
  }

  const updatedProduct = await models.Item.findByIdAndUpdate(
    formData.id,
    {
      stock: formData.stock,
      size: formData.size,
    },
    { new: true }
  );

  if (!updatedProduct) {
    return { success: false, message: "Item not found" };
  }
  const items = await models.Item.find({ productId: formData.productId });
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0);

  await models.Product.findByIdAndUpdate(
    formData.productId,
    { totalStock },
    { new: true }
  );

  revalidatePath(`/dashboard/products/${formData.productId}`);
  return {
    data: JSON.parse(JSON.stringify(updatedProduct)),
    success: true,
    message: "Item actualizado correctamente.",
  };
};

export const deleteItem = async (id: string) => {
  await dbConnect();

  // Obtener el ítem antes de eliminarlo para conocer el productId
  const itemToDelete: IItem | null = await models.Item.findById(id);
  if (!itemToDelete) {
    return { message: "Item no encontrado.", success: false };
  }

  await models.Item.findByIdAndDelete(id);

  // Recontar el totalStock del producto padre
  const items: IItem[] = await models.Item.find({
    productId: itemToDelete.productId,
  });
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0);

  await models.Product.findByIdAndUpdate(
    itemToDelete.productId,
    { totalStock },
    { new: true }
  );

  revalidatePath(`/dashboard/products/${itemToDelete.productId}`);
  return { message: "Item eliminado correctamente.", success: true };
};
