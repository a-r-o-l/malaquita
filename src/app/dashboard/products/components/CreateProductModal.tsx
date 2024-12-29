"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PendingButton from "@/components/PendingButton";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PartialProduct } from "@/models/Product";
import { cloneProduct } from "@/actions/productActions";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

function CreateProductModal({
  product,
  children,
  classname,
  size = "default",
  variant = "default",
}: {
  product: PartialProduct;
  children: React.ReactNode;
  classname?: string;
  size?: "default" | "icon" | "sm" | "lg";
  variant?:
    | "default"
    | "ghost"
    | "outline"
    | "secondary"
    | "link"
    | "destructive";
}) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (product) {
      formData.append("productId", product._id!);
      if (product.code) formData.append("code", product.code);
      if (product.name) formData.append("name", product.name);
      if (product.description)
        formData.append("description", product.description);
      if (product.category?._id)
        formData.append("category", product.category._id);
      if (product.costPrice)
        formData.append("costPrice", product.costPrice.toString());
      if (product.price) formData.append("price", product.price.toString());
      if (product.color) formData.append("color", product.color);
      if (product.uniqueSize !== undefined)
        formData.append("uniqueSize", product.uniqueSize.toString());
    }
    const response = await cloneProduct(formData);
    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        className={classname}
        variant={variant}
        size={size}
        onClick={() => setOpen(true)}
        disabled={user?.role !== "admin"}
      >
        {children}
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <div className="dialog-header">
            <DialogTitle>Nuevo talle</DialogTitle>
            <DialogDescription>Crear un nuevo talle</DialogDescription>
          </div>
          <form
            className="flex flex-col gap-5 items-start"
            onSubmit={handleSubmit}
          >
            <div className="w-full space-y-2">
              <Label>Talle</Label>
              <Input placeholder="Ingresa el talle" name="size" />
            </div>
            <div className="w-full space-y-2">
              <Label>Stock</Label>
              <Input
                placeholder="Ingresa el stock"
                type="number"
                name="stock"
              />
            </div>
            <div className="w-full flex mt-5 justify-center">
              <PendingButton className="w-40">Crear</PendingButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateProductModal;
