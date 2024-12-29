"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getIconById } from "@/lib/icons";
import { ICategory } from "@/models/Category";

function CategorySelect({ categories }: { categories: ICategory[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    router.push(`/dashboard/products?${params.toString()}`);
  };

  return (
    <Select
      name="category"
      value={selectedCategory}
      onValueChange={handleValueChange}
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
              <div className="flex flex-row items-center">
                <span className="mr-2">{getIconById(category.icon)}</span>
                <p>{category.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CategorySelect;
