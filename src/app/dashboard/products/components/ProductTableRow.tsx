import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/models/Product";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { groupedItems } from "../../sales/components/ProductsCard";

function ProductTableRow({
  product,
  addProductToCart,
}: {
  product: groupedItems;
  addProductToCart: (product: IProduct) => void;
}) {
  const [open, setOpen] = useState<IProduct | null>(null);
  if (!product.hasMultipleItems) {
    const item = product.items.length ? product.items[0] : null;
    if (!item) return null;
    return (
      <TableRow>
        <TableCell>{item.code}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.color}</TableCell>
        <TableCell>{item.category?.name || "-"}</TableCell>
        <TableCell>{item.size || "-"}</TableCell>
        <TableCell>{item.stock}</TableCell>
        <TableCell>$ {item.price.toLocaleString("es-ES")}</TableCell>
        <TableCell className="text-right">
          <Button size="icon" onClick={() => addProductToCart(item)}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
  const items = product.items;
  const item = items[0];
  const sizes = product.items.map((item) => item.size).join(", ");
  const totalStock = product.items.reduce((acc, item) => acc + item.stock!, 0);
  return (
    <TableRow key={item._id} className="w-full">
      <TableCell>{item.code}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.color}</TableCell>
      <TableCell>{item.category?.name || "-"}</TableCell>
      <TableCell>{sizes}</TableCell>
      <TableCell>{totalStock}</TableCell>
      <TableCell>$ {item.price.toLocaleString("es-ES")}</TableCell>
      <TableCell className="text-right">
        <Button size="icon" onClick={() => setOpen(item)}>
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </TableCell>
      <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
        <DialogContent>
          <div className="dialog-header">
            <DialogTitle>{`${item.code} ${item.name}`}</DialogTitle>
            <DialogDescription>
              Selecciona un talle disponible.
            </DialogDescription>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableCell>Talle</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it: IProduct) => (
                <TableRow key={it._id}>
                  <TableCell>{it.size}</TableCell>
                  <TableCell align="center">{it.stock}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="icon"
                      onClick={() => {
                        addProductToCart(it);
                        setOpen(null);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter className="mt-10">
            <Button
              variant="outline"
              onClick={() => {
                setOpen(null);
              }}
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TableRow>
  );
}

export default ProductTableRow;
