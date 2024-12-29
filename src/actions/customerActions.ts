"use server";
import dbConnect from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import models from "@/models/index";
import { IItem } from "@/models/Item";

export const getAllCustomers = async () => {
  await dbConnect();
  const customers = await models.Customer.find({}).lean();
  return customers.map((customer) => JSON.parse(JSON.stringify(customer)));
};

export const searchCustomers = async (name: string) => {
  await dbConnect();
  const condition: {
    name?: {
      $regex: string;
      $options: string;
    };
  } = {};
  if (name) {
    condition.name = { $regex: name, $options: "i" };
  }

  let customers = await models.Customer.find(condition).lean();
  if (customers.length === 0 && name) {
    const lastnameCondition = {
      lastname: { $regex: name, $options: "i" },
    };
    customers = await models.Customer.find(lastnameCondition).lean();
  }
  return customers.map((customer) => JSON.parse(JSON.stringify(customer)));
};

export const getCustomer = async (id: string) => {
  await dbConnect();
  const customer = await models.Customer.findById(id).lean();
  return JSON.parse(JSON.stringify(customer));
};

export const createCustomer = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());

  const newCustomer = new models.Customer({
    name: formData.name,
    lastname: formData.lastname,
    dni: formData.dni,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
  });
  await newCustomer.save();

  revalidatePath(`/dashboard/settings/customers`);
};

export const editCustomer = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());

  const customerExist = await models.Customer.findOne({
    productId: formData.productId,
    size: formData.size,
    _id: { $ne: formData.id },
  });

  if (customerExist) {
    return { success: false, message: "Ya existe el talle en este producto." };
  }

  const updatedProduct = await models.Customer.findByIdAndUpdate(
    formData.id,
    {
      stock: formData.stock,
      size: formData.size,
    },
    { new: true }
  );

  if (!updatedProduct) {
    return { success: false, message: "Customer not found" };
  }
  const items = await models.Customer.find({ productId: formData.productId });
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
    message: "Customer actualizado correctamente.",
  };
};

export const deleteCustomer = async (id: string) => {
  await dbConnect();

  // Obtener el ítem antes de eliminarlo para conocer el productId
  const itemToDelete: IItem | null = await models.Customer.findById(id);
  if (!itemToDelete) {
    return { message: "Customer no encontrado.", success: false };
  }

  await models.Customer.findByIdAndDelete(id);

  // Recontar el totalStock del producto padre
  const items: IItem[] = await models.Customer.find({
    productId: itemToDelete.productId,
  });
  const totalStock = items.reduce((acc, item) => acc + item.stock, 0);

  await models.Product.findByIdAndUpdate(
    itemToDelete.productId,
    { totalStock },
    { new: true }
  );

  revalidatePath(`/dashboard/products/${itemToDelete.productId}`);
  return { message: "Customer eliminado correctamente.", success: true };
};
