"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { PartialProduct } from "@/models/Product";

function ProductModal({
  refresh,
  open,
  product,
  onClose,
}: {
  refresh: () => Promise<void>;
  open: boolean;
  product: PartialProduct | null;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("0");
  const [price, setPrice] = useState("0");
  const [stock, setStock] = useState("0");
  const [size, setSize] = useState("");
  const [withSize, setWithSize] = useState(false);

  const handleSaveProduct = async (prod: PartialProduct) => {
    const method = prod.id ? "PUT" : "POST";
    await fetch("/api/products", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prod),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      id: product ? product._id : undefined,
      name,
      description,
      price: price ? Number(price) : 0,
      costPrice: cost ? Number(cost) : 0,
      stock: stock ? Number(stock) : 0,
      size,
    };
    handleSaveProduct(newProduct);
    await refresh();
    onClose();
  };

  const isEmpty = (value: string) => value === "" || value === "0";

  const fieldsMatch = (
    product: PartialProduct,
    name: string,
    description: string,
    cost: string,
    price: string,
    stock: string,
    size: string
  ) => {
    return (
      product.name === name &&
      product.description === description &&
      product.costPrice === Number(cost) &&
      product.price === Number(price) &&
      product.stock === Number(stock) &&
      product.size === size
    );
  };

  const disabledSubmit = useMemo(() => {
    const emptyFields = [name, description, cost, price, stock].some(isEmpty);

    if (product) {
      return (
        emptyFields ||
        fieldsMatch(product, name, description, cost, price, stock, size)
      );
    }

    return emptyFields;
  }, [product, name, description, cost, price, stock, size]);

  useEffect(() => {
    if (open) {
      if (product) {
        setName(product.name || "");
        setDescription(product.description || "");
        setCost(product?.costPrice?.toString() || "0");
        setPrice(product?.price?.toString() || "0");
        setStock(product?.stock?.toString() || "0");
        setSize(product.size || "");
        setWithSize(!!product.size);
      } else {
        setName("");
        setDescription("");
        setCost("0");
        setPrice("0");
        setStock("0");
        setSize("");
        setWithSize(false);
      }
    }
  }, [open, product]);

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <div className="dialog-header">
            <DialogTitle>{`${
              product ? "Editar " : "Crear "
            }producto`}</DialogTitle>
            <DialogDescription>{`${
              product ? "editar un " : "Crear un nuevo "
            } producto`}</DialogDescription>
          </div>
          <form
            className="flex flex-col gap-5 items-start"
            onSubmit={handleSubmit}
          >
            <div className="w-full space-y-2">
              <Label>nombre</Label>
              <Input
                placeholder="Ingresa el nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Descripcion</Label>
              <Input
                placeholder="Ingresa la descripcion"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Precio costo</Label>
              <Input
                placeholder="Ingresa el precio de costo"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Precio de venta</Label>
              <Input
                placeholder="Ingresa el precio de venta"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Stock</Label>
              <Input
                placeholder="Ingresa el stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                type="number"
              />
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-center gap-5">
                <Label>Talle</Label>
                <Switch
                  checked={withSize}
                  onCheckedChange={() => setWithSize(!withSize)}
                />
              </div>
              <Input
                disabled={!withSize}
                placeholder="Ingresa el talle"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className="w-full flex mt-5 justify-center">
              <Button
                type="submit"
                className="w-full"
                disabled={disabledSubmit}
              >
                {product ? "Editar producto" : "Crear producto"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductModal;
