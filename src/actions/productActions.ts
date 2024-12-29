"use server";

import dbConnect from "@/lib/mongoose";
import { IProduct } from "@/models/Product";
import { revalidatePath } from "next/cache";
import models from "@/models/index";

interface IProductData extends IProduct {
  similarProducts: IProduct[] | null;
}

export const getAllProducts = async (): Promise<IProduct[]> => {
  await dbConnect();
  const products: IProduct[] = await models.Product.find({})
    .populate("category")
    .lean<IProduct[]>();
  const items = await models.Item.find({}).populate("productId").lean();
  const productsWithItems = products.map((product) => {
    const productItems = items.filter((item) => {
      return item.productId._id.toString() === product._id.toString();
    });
    return {
      ...product,
      items: productItems,
    };
  });

  return productsWithItems.map((prod) => JSON.parse(JSON.stringify(prod)));
};

export async function getProductsByCategory(
  categoryId?: string,
  searchQuery?: string
) {
  await dbConnect();
  const condition: {
    category?: string;
    name?: {
      $regex: string;
      $options: string;
    };
  } = {};
  if (categoryId && categoryId !== "all") {
    condition.category = categoryId;
  }
  if (searchQuery) {
    condition.name = { $regex: searchQuery, $options: "i" };
  }
  const products = await models.Product.find(condition)
    .populate("category")
    .lean();
  const parseProducts = products.map((prod) =>
    JSON.parse(JSON.stringify({ ...prod }))
  );

  return { data: parseProducts, success: true };
}

export async function getProduct(
  productId?: string
): Promise<IProductData | null> {
  await dbConnect();
  const product: IProductData | null = (await models.Product.findById(productId)
    .populate("category")
    .lean()) as IProductData | null;

  if (!product) {
    return null;
  }

  if (!product.uniqueSize) {
    const similarProducts = await models.Product.find({
      code: product.code,
      _id: { $ne: productId },
    }).lean();
    product.similarProducts = similarProducts as unknown as IProduct[];
  }
  return JSON.parse(JSON.stringify(product));
}

export async function cloneProduct(data: FormData) {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());
  const productExist = await models.Product.findOne({
    code: formData.code,
    size: formData.size,
  });
  if (productExist) {
    return {
      success: false,
      message: "Ya existe el talle ingresado en este producto.",
    };
  }
  const newProduct = new models.Product({
    code: formData.code,
    name: formData.name,
    description: formData.description,
    category: formData.category,
    costPrice: formData.costPrice,
    price: formData.price,
    color: formData.color,
    stock: formData.stock,
    uniqueSize: formData.uniqueSize,
    size: formData.size,
  });
  await newProduct.save();
  revalidatePath(`/dashboard/products/${formData.productId}`);
  return {
    data: JSON.parse(JSON.stringify(newProduct)),
    success: true,
    message: "Producto creado correctamente.",
  };
}

export const createProduct = async (data: FormData) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const newProduct = new models.Product({
      code: formData.code,
      name: formData.name,
      description: formData.description,
      category: formData.category ? formData.category : null,
      costPrice: formData.costPrice,
      price: formData.price,
      color: formData.color,
      uniqueSize: formData.uniqueSize,
      stock: formData.stock,
      size: formData.size,
      imageUrl: formData.imageUrl,
    });
    await newProduct.save();
    revalidatePath("/dashboard/products");
    return {
      success: true,
      message: "Producto creado satisfactoriamente",
      product: JSON.parse(JSON.stringify(newProduct)),
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: "Error al crear el producto, intente nuevamente",
    };
  }
};

export const editProduct = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());
  const itemExist = await models.Product.findOne({
    code: formData.code,
    size: formData.size,
  });

  if (itemExist) {
    return { success: false, message: "Ya existe el talle en este producto." };
  }
  const updatedProduct = await models.Product.findByIdAndUpdate(
    formData.id,
    {
      stock: formData.stock,
      size: formData.size,
    },
    { new: true }
  );
  revalidatePath(`/dashboard/products/${formData.productId}`);
  return {
    data: JSON.parse(JSON.stringify(updatedProduct)),
    success: true,
    message: "Item actualizado correctamente.",
  };
};

export const editProducts = async (data: FormData) => {
  try {
    await dbConnect();
    const formData = Object.fromEntries(data.entries());
    const updatedProducts = await models.Product.updateMany(
      { code: formData.code },
      {
        $set: {
          name: formData.name,
          category: formData.category,
          color: formData.color,
          description: formData.description,
          price: formData.price,
          costPrice: formData.costPrice,
        },
      }
    );
    if (updatedProducts) {
      revalidatePath(`/dashboard/products/${formData.id}`);
      return {
        success: true,
        message: "Producto actualizado correctamente.",
        data: JSON.parse(JSON.stringify(updatedProducts)),
      };
    } else {
      return {
        success: false,
        message: "Error al actualizar el producto, intente nuevamente.",
      };
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      message: "Error al actualizar el producto, intente nuevamente.",
    };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await dbConnect();
    await models.Product.findByIdAndDelete(id).lean();
    revalidatePath("/dashboard/products");
    return { success: true, message: "Producto eliminado correctamente." };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Error al eliminar el producto." };
  }
};
