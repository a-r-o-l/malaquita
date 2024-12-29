"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../../../components/ui/dialog";
import PendingButton from "../../../../components/PendingButton";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { toast } from "sonner";
import { PartialProduct } from "@/models/Product";
import { deleteProduct, editProducts } from "@/actions/productActions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { ICategory } from "@/models/Category";
import { Pencil, Trash2 } from "lucide-react";
import CustomAlertDialog from "./CustomAlertDialog";
import { useRouter } from "next/navigation";

const emptyDataValue = {
  code: "",
  name: "",
  category: "",
  color: "",
  description: "",
  price: "",
  costPrice: "",
};

function EditProductInfoModal({
  item,
  categories,
}: {
  item: PartialProduct;
  categories: ICategory[];
}) {
  const router = useRouter();
  const { user } = useUser();
  const [dataValue, setDataValue] = useState(emptyDataValue);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("id", item._id!);
    formData.append("code", item.code!);
    const result = await editProducts(formData);
    if (result.success) {
      toast.success(result.message);
      setOpen(false);
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
    if (item) {
      setDataValue({
        code: item.code || "",
        name: item.name || "",
        category: item?.category?._id || "",
        color: item.color || "",
        description: item.description || "",
        price: item.price?.toString() || "",
        costPrice: item.costPrice?.toString() || "",
      });
    } else {
      setDataValue(emptyDataValue);
    }
  }, [item]);

  const isDisabled = useMemo(() => {
    const checkSameValues = Object.keys(dataValue);
    const someHasNullValue = checkSameValues.some(
      (key) => dataValue[key as keyof typeof dataValue] === ""
    );
    const someHasDifferentValue = checkSameValues.some((key) => {
      if (key === "price" || key === "costPrice") {
        return (
          parseInt(dataValue[key as keyof typeof dataValue]) !==
          item[key as keyof typeof item]
        );
      }
      if (key === "category") {
        return dataValue[key as keyof typeof dataValue] !== item?.category?._id;
      }
      return (
        dataValue[key as keyof typeof dataValue] !==
        item[key as keyof typeof item]
      );
    });
    return someHasNullValue || !someHasDifferentValue;
  }, [dataValue, item]);

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          if (user?.role !== "admin") {
            toast.error("No tienes permisos para editar productos");
            return;
          }
          setOpen(true);
        }}
        size="icon"
        className="rounded-full"
        variant="outline"
        disabled={user?.role !== "admin"}
      >
        <Pencil />
      </Button>
      <Button
        size="icon"
        className="rounded-full"
        variant="outline"
        disabled={user?.role !== "admin"}
        onClick={() => setOpenDialog(true)}
      >
        <Trash2 />
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <div className="dialog-header">
            <DialogTitle>Editar producto</DialogTitle>
            <DialogDescription>
              Editar informacion de un producto
            </DialogDescription>
          </div>
          <form
            className="flex flex-col gap-5 items-start"
            onSubmit={handleSubmit}
          >
            <div className="w-full space-y-2">
              <Label>code</Label>
              <Input
                placeholder="Ingresa el stock"
                type="number"
                name="code"
                value={dataValue.code}
                readOnly
                disabled
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Nombre</Label>
              <Input
                placeholder="Ingresa el nombre"
                name="name"
                value={dataValue.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Category</Label>
              <Select
                name="category"
                value={dataValue.category}
                onValueChange={(e) =>
                  setDataValue({ ...dataValue, category: e })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category: ICategory) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full space-y-2">
              <Label>Color</Label>
              <Input
                placeholder="Ingresa el color"
                name="color"
                value={dataValue.color}
                onChange={handleChange}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Descripcion</Label>
              <Textarea
                placeholder="Ingresa una descripcion"
                name="description"
                value={dataValue.description}
                onChange={handleChange}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Precio</Label>
              <Input
                placeholder="Ingresa el precio"
                name="price"
                value={dataValue.price}
                onChange={handleChange}
              />
            </div>
            <div className="w-full space-y-2">
              <Label>Precio de costo</Label>
              <Input
                placeholder="Ingresa el precio"
                name="costPrice"
                value={dataValue.costPrice}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex mt-5 justify-center gap-5">
              <PendingButton className="w-32" disabled={isDisabled}>
                Editar
              </PendingButton>
              <Button
                variant="outline"
                type="button"
                className="w-32"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <CustomAlertDialog
        title="Eliminar producto"
        description="Estas seguro que deseas eliminar este producto?"
        onAccept={async () => {
          const res = await deleteProduct(item._id!);
          if (res.success) {
            toast.success(res.message);
            setOpenDialog(false);
            router.push("/dashboard/products");
          } else {
            toast.error(res.message);
          }
        }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </div>
  );
}

export default EditProductInfoModal;
