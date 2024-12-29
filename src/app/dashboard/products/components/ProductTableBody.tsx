"use client";
import { TableBody } from "@/components/ui/table";
import React, { useState } from "react";
import { PartialProduct } from "@/models/Product";
import { deleteProduct } from "@/actions/productActions";
import ProductTableCell from "./ProductTableCell";
import CustomAlertDialog from "./CustomAlertDialog";

function ProductTableBody({
  products,
  role,
}: {
  products: PartialProduct[];
  role: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  const groupedProductsArray = products.reduce((acc, product) => {
    const groupId = product.code;
    if (!groupId) {
      console.warn("Product code is undefined for product:", product);
      return acc;
    }
    if (!acc[groupId]) {
      acc[groupId] = {
        id: groupId,
        hasMultipleItems: false,
        items: [],
      };
    }
    acc[groupId].items.push(product);
    acc[groupId].hasMultipleItems = acc[groupId].items.length > 1;
    return acc;
  }, {} as { [key: string]: { id: string; hasMultipleItems: boolean; items: PartialProduct[] } });

  const groupedProductsList = Object.values(groupedProductsArray);

  return (
    <TableBody>
      {groupedProductsList.map((group) => (
        <ProductTableCell product={group} key={group.id} role={role} />
      ))}
      <CustomAlertDialog
        title="Estas seguro?"
        description="Estas por eliminar un producto, esta accion no se puede deshacer"
        onAccept={() => {
          deleteProduct(open!);
          setOpen(null);
        }}
        open={!!open}
        onClose={() => setOpen(null)}
      />
    </TableBody>
  );
}

export default ProductTableBody;
