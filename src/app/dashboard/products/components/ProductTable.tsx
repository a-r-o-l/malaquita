"use client";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import ProductTableBody from "./ProductTableBody";
import { PartialProduct } from "@/models/Product";
import { useUser } from "@/context/UserContext";

function ProductTable({ products }: { products: PartialProduct[] }) {
  const { user } = useUser();
  if (!user) {
    return null;
  }
  return (
    <Table>
      <TableHeader className="sticky top-0 z-10">
        <TableRow>
          <TableHead align="left">Imagen</TableHead>
          <TableHead>Codigo</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Descripcion</TableHead>
          <TableHead>Color</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Talle/s</TableHead>
          <TableHead>Stock</TableHead>
          {user && user.role === "admin" && <TableHead>Precio costo</TableHead>}
          <TableHead>Precio publico</TableHead>
          <TableHead align="center"></TableHead>
        </TableRow>
      </TableHeader>
      <ProductTableBody products={products} role={user?.role || "user"} />
    </Table>
  );
}

export default ProductTable;
