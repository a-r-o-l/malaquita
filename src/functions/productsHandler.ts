import { Dispatch, SetStateAction } from "react";

export const getProducts = async (set: Dispatch<SetStateAction<never[]>>) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  set(data);
};

export const priceParser = (price?: number) => {
  if (!price || price === 0) {
    return "-";
  }
  return `$ ${price.toLocaleString("es-ES")}`;
};
