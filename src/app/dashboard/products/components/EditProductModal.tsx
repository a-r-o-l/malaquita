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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { editProduct } from "@/actions/productActions";
import { PartialProduct } from "@/models/Product";

const emptyDataValue = {
  stock: 0,
  size: "",
};

function EditProductModal({
  item,
  open,
  onClose,
}: {
  item: PartialProduct;
  open: boolean;
  onClose: () => void;
}) {
  const [dataValue, setDataValue] = useState(emptyDataValue);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("id", item._id!);
    formData.append("code", item.code!);
    const result = await editProduct(formData);
    if (result.success) {
      toast.success(result.message);
      onClose();
    } else {
      toast.error(result.message);
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setDataValue((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (item && open) {
      setDataValue({
        stock: item.stock || 0,
        size: item.size || "",
      });
    } else {
      setDataValue(emptyDataValue);
    }
  }, [item, open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <div className="dialog-header">
          <DialogTitle>Editar item</DialogTitle>
          <DialogDescription>Editar un item</DialogDescription>
        </div>
        <form
          className="flex flex-col gap-5 items-start"
          onSubmit={handleSubmit}
        >
          <div className="w-full space-y-2">
            <Label>Stock</Label>
            <Input
              placeholder="Ingresa el stock"
              type="number"
              name="stock"
              value={dataValue.stock}
              onChange={handleChange}
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Talle</Label>
            <Input
              placeholder="Ingresa el talle"
              type="number"
              name="size"
              value={dataValue.size}
              onChange={handleChange}
            />
          </div>
          <div className="w-full flex mt-5 justify-center gap-5">
            <PendingButton className="w-32">Editar item</PendingButton>
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="w-32"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductModal;
