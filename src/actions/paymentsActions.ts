"use server";
import dbConnect from "@/lib/mongoose";
import { revalidatePath } from "next/cache";
import models from "@/models/index";

export const createPayment = async (data: FormData) => {
  await dbConnect();
  const formData = Object.fromEntries(data.entries());

  const sale = await models.Sale.findById(formData.sale);
  if (!sale) {
    return {
      success: false,
      message: "La venta no existe.",
    };
  }
  const totalPayment = Number(sale.pay) + Number(formData.pay);
  if (totalPayment > sale.total) {
    return {
      success: false,
      message: "El pago excede el total de la venta.",
    };
  }
  sale.pay = totalPayment;
  await sale.save();
  const newPayment = new models.Payment({
    date: formData.date,
    pay: formData.pay,
    sale: formData.sale,
    customer: formData.customer,
    account: formData.account,
  });
  await newPayment.save();
  revalidatePath(`/dashboard/payments/${formData.sale}`);
  return {
    data: JSON.parse(JSON.stringify(newPayment)),
    success: true,
    message: "Pago creado satisfactoriamente.",
  };
};

export const getAllPayments = async () => {
  await dbConnect();
  const payments = await models.Payment.find()
    .populate("account")
    .populate("sale")
    .populate("customer");
  return JSON.parse(JSON.stringify(payments));
};

export const getPaymentBySale = async (id: string) => {
  await dbConnect();
  const payments = await models.Payment.find({ sale: id })
    .populate("account")
    .populate("sale")
    .populate("customer");
  return JSON.parse(JSON.stringify(payments));
};

export const getPayment = async (id: string) => {
  await dbConnect();
  const payment = await models.Payment.findById(id)
    .populate("account")
    .populate("sale")
    .populate("customer");
  return JSON.parse(JSON.stringify(payment));
};
