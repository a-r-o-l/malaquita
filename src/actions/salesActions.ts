"use server";

import dbConnect from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import models from "@/models/index";
import { toDate } from "date-fns-tz";

interface GroupedSales {
  [date: string]: {
    date: string;
    [username: string]: number | string;
  };
}

export const createSale = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());
  const items = JSON.parse(formData.items as string);
  for (const id of items) {
    const product = await models.Product.findById(id);
    if (product) {
      product.stock -= 1;
      await product.save();
    }
  }
  const pay = formData.type === "cuenta corriente" ? 0 : Number(formData.pay);
  const newSale = new models.Sale({
    date: formData.date,
    accountId: formData.accountId,
    type: formData.type,
    total: formData.total,
    items: items.map((id: string) => new mongoose.Types.ObjectId(id)),
    customerId: formData.customerId,
    pay,
  });
  await newSale.save();
  revalidatePath("/dashboard/sales");
  return {
    data: JSON.parse(JSON.stringify(newSale)),
    success: true,
    message: "Venta creada satisfactoriamente.",
  };
};

export const getAllSales = async () => {
  await dbConnect();
  const sales = await models.Sale.find().populate("accountId");
  return JSON.parse(JSON.stringify(sales));
};

export const getAllSalesByCustomer = async (id: string) => {
  await dbConnect();
  const sales = await models.Sale.find({
    customerId: id,
    type: "cuenta corriente",
  }).populate("accountId");
  return JSON.parse(JSON.stringify(sales));
};

export const getAllCurrentAccounts = async () => {
  await dbConnect();
  const sales = await models.Sale.find({
    type: "cuenta corriente",
  })
    .populate("accountId")
    .populate("customerId");
  return JSON.parse(JSON.stringify(sales));
};

export const getAllSalesByDate = async (
  start: string,
  end: string,
  user: string
) => {
  await dbConnect();
  const query: {
    date?: {
      $gte: Date;
      $lte: Date;
    };
    accountId?: string;
  } = {};
  if (start && end) {
    const timeZone = "America/Argentina/Buenos_Aires";

    const startDate = toDate(start, { timeZone });
    const endDate = toDate(end, { timeZone });
    endDate.setHours(23, 59, 59, 999);

    query.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  if (user && user !== "all") {
    query.accountId = user;
  }
  const sales = await models.Sale.find(query).populate("accountId");
  return JSON.parse(JSON.stringify(sales));
};

export const getSalesBetweenUsers = async (
  start: string,
  end: string,
  user: string
) => {
  await dbConnect();
  const query: {
    date?: {
      $gte: Date;
      $lte: Date;
    };
    accountId?: string;
  } = {};
  if (start && end) {
    const timeZone = "America/Argentina/Buenos_Aires";

    const startDate = toDate(start, { timeZone });
    const endDate = toDate(end, { timeZone });
    endDate.setHours(23, 59, 59, 999);

    query.date = {
      $gte: startDate,
      $lte: endDate,
    };
  }
  if (user && user !== "all") {
    query.accountId = user;
  }
  const sales = await models.Sale.find(query).populate("accountId");

  let allUsers = [];
  if (user === "all" || !user) {
    allUsers = await models.Account.find().select("username").lean();
    allUsers = allUsers.map((u) => u.username);
  }

  const groupedSales: GroupedSales = sales.reduce((acc, sale) => {
    const date = new Date(sale.date).toLocaleDateString("en-US", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const username = sale.accountId.username;

    if (!acc[date]) {
      acc[date] = { date };
    }
    if (!acc[date][username]) {
      acc[date][username] = 0;
    }
    acc[date][username] += sale.total;

    return acc;
  }, {});

  if (user === "all" || !user) {
    Object.values(groupedSales).forEach((entry) => {
      allUsers.forEach((username) => {
        if (!entry[username]) {
          entry[username] = 0;
        }
      });
    });
  }

  const result = Object.values(groupedSales);

  return JSON.parse(JSON.stringify(result));
};

export const getAllCurrentAccountsByDate = async (
  start: string,
  end: string,
  customer: string
) => {
  await dbConnect();
  const query: {
    date?: {
      $gte: Date;
      $lt: Date;
    };
    customerId?: string;
    type?: string;
  } = { type: "cuenta corriente" };
  if (start && end) {
    const timeZone = "America/Argentina/Buenos_Aires";
    const startDate = toDate(start, { timeZone });
    const endDate = toDate(end, { timeZone });
    endDate.setHours(23, 59, 59, 999);
    query.date = {
      $gte: startDate,
      $lt: endDate,
    };
  }
  if (customer && customer !== "all") {
    query.customerId = customer;
  }
  const sales = await models.Sale.find(query)
    .populate("accountId")
    .populate("customerId");
  return JSON.parse(JSON.stringify(sales));
};

export const getSale = async (id: string) => {
  await dbConnect();
  const sale = await models.Sale.findById(id)
    .populate("accountId")
    .populate("items");
  return JSON.parse(JSON.stringify(sale));
};

export const getCurrentAccount = async (id: string) => {
  await dbConnect();
  const sale = await models.Sale.findById(id)
    .populate("accountId")
    .populate("items")
    .populate("customerId");
  return JSON.parse(JSON.stringify(sale));
};
