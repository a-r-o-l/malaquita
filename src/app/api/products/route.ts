import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Product from "@/models/Item";

export async function GET() {
  await dbConnect();
  const products = await Product.find({});
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  await dbConnect();
  const { id, name, description, price, costPrice, stock, size } =
    await request.json();
  const newProduct = new Product({
    id,
    name,
    description,
    price,
    costPrice,
    stock,
    size,
  });
  await newProduct.save();
  return NextResponse.json(newProduct);
}

export async function PUT(request: Request) {
  await dbConnect();
  const { id, name, description, price, costPrice, stock, size } =
    await request.json();
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, description, price, costPrice, stock, size },
    { new: true }
  );
  return NextResponse.json(updatedProduct);
}

export async function DELETE(request: Request) {
  await dbConnect();
  const { id } = await request.json();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" });
}
