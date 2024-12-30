import PendingButton from "@/components/PendingButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { createCategory, getAllCategories } from "@/actions/categoriesActions";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { PartialCategory } from "@/models/Category";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryIcons, getIconById } from "@/lib/icons";

export default async function CategoriesScreen() {
  const categories = await getAllCategories();

  return (
    <div className="flex w-full flex-col p-10">
      <div className="flex flex-col lg:flex-row w-full gap-10 mt-10">
        <form
          className="flex justify-center w-full lg:w-1/2 "
          action={createCategory}
        >
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Nueva Categoria</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-5">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Titulo</Label>
                  <Input
                    placeholder="Ingresa el titulo de la categoria"
                    name="name"
                    autoComplete="off"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="icon">Icono</Label>
                  <Select name="icon">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un icono" />
                    </SelectTrigger>
                    <SelectContent className="flex flex-row">
                      <SelectGroup>
                        <SelectLabel>Iconos</SelectLabel>
                        {categoryIcons.map((icon) => (
                          <SelectItem key={icon.id} value={icon.id.toString()}>
                            {icon.icon}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end mt-10">
              <PendingButton className="w-full bg-fuchsia-500 hover:bg-fuchsia-700 text-white">
                Crear Categoria
              </PendingButton>
            </CardFooter>
          </Card>
        </form>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Icono</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((product: PartialCategory) => (
                  <TableRow key={product?._id}>
                    <TableCell>{getIconById(product.icon)}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{20}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                      >
                        <Pencil size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
