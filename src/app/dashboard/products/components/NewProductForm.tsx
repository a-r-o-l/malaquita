"use client";
import { createProduct } from "@/actions/productActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getIconById } from "@/lib/icons";
import { ICategory } from "@/models/Category";
import { useMemo, useState } from "react";
import GoToButton from "../../../../components/GoToButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ImageViewer from "./ImageViewer";
import LoadingButton from "./LoadingButton";

type FormValues = {
  code: string;
  name: string;
  description: string;
  color: string;
  category: string;
  costPrice: string;
  price: string;
  stock: string;
  uniqueSize: boolean;
  size: string;
};

const initialValues = {
  code: "",
  name: "",
  description: "",
  color: "",
  category: "",
  costPrice: "",
  price: "",
  stock: "",
  uniqueSize: false,
  size: "",
};

function NewProductForm({ categories }: { categories: ICategory[] }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<FormValues>(initialValues);

  const disableSubmit = useMemo(() => {
    if (
      !values.category ||
      !values.code ||
      !values.name ||
      !values.price ||
      !values.stock ||
      (!values.uniqueSize && !values.size)
    ) {
      return true;
    }
    return false;
  }, [values]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = "";
    try {
      setLoading(true);
      if (file) {
        const formDataImage = new FormData();
        formDataImage.append("file", file);
        formDataImage.append("folder", "products");
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataImage,
        });
        if (response.ok) {
          const result = await response.json();
          imageUrl = result.imageUrl;
          console.log("File uploaded successfully", result);
        } else {
          console.error("File upload failed", await response.text());
        }
      }
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      formData.append("imageUrl", imageUrl);
      const res = await createProduct(formData);
      if (res.success) {
        setLoading(false);
        toast.success(res.message);
        setValues(initialValues);
        setFile(null);
        router.push("/dashboard/products");
      } else {
        toast.error(res.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error del servidor, intente nuevamente");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Nuevo Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={onSubmit}
        >
          <div className="md:col-span-1">
            <ImageViewer setFile={setFile} file={file} classname="h-64" />
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <Label htmlFor="code">Codigo</Label>
              <Input
                onChange={handleChange}
                value={values.code}
                autoComplete="off"
                placeholder="Ingresa el nombre del producto"
                name="code"
                id="code"
              />
            </div>
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                onChange={handleChange}
                value={values.name}
                id="name"
                name="name"
                placeholder="Ingresa el nombre"
              />
            </div>
            <div>
              <Label htmlFor="description">Descripcion</Label>
              <Textarea
                onChange={handleChange}
                value={values.description}
                id="description"
                name="description"
                placeholder="Ingresa la descripcion del producto"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <Input
              onChange={handleChange}
              value={values.color}
              id="color"
              placeholder="Ingresa el color"
              name="color"
            />
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select
              name="category"
              onValueChange={(e) =>
                setValues((prev) => {
                  return { ...prev, category: e };
                })
              }
              value={values.category}
            >
              <SelectTrigger className="w-full" id="category">
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorias</SelectLabel>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      <div className="flex flex-row items-center">
                        <span className="mr-2">
                          {getIconById(category.icon)}
                        </span>
                        <p>{category.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="cost-price">Precio de costo</Label>
            <Input
              onChange={handleChange}
              value={values.costPrice}
              id="cost-price"
              name="costPrice"
              type="number"
              step="0.01"
              placeholder="Ingresa el precio de costo"
            />
          </div>
          <div>
            <Label htmlFor="price">Precio</Label>
            <Input
              onChange={handleChange}
              value={values.price}
              id="price"
              name="price"
              type="number"
              step="0.01"
              placeholder="Ingresa el precio al publico"
            />
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              onChange={handleChange}
              value={values.stock}
              id="stock"
              type="number"
              placeholder="Ingresa el stock"
              name="stock"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Checkbox
                id="unique-size"
                name="uniqueSize"
                checked={values.uniqueSize}
                onCheckedChange={(checked: boolean) =>
                  setValues((prev) => ({ ...prev, uniqueSize: checked }))
                }
              />
              <Label htmlFor="unique-size">Talle unico</Label>
            </div>
            <Input
              onChange={handleChange}
              value={values.size}
              id="size"
              name="size"
              placeholder="Ingresa el talle"
              disabled={values.uniqueSize}
            />
          </div>
          <div className="md:col-span-2 flex justify-end gap-10 mt-10">
            <LoadingButton
              loading={loading}
              disabled={disableSubmit}
              title="Crear Producto"
              classname="w-40"
              type="submit"
            />
            <GoToButton
              disabled={loading}
              goTo="/dashboard/products"
              title="Cancelar"
              className="w-40"
              variant="outline"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default NewProductForm;
