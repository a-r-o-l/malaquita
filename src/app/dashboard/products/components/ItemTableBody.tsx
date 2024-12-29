"use client";
import { Button } from "@/components/ui/button";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import CustomAlertDialog from "./CustomAlertDialog";
import { useState } from "react";
import EditProductModal from "./EditProductModal";
import { deleteProduct } from "@/actions/productActions";
import { PartialProduct } from "@/models/Product";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";

function ItemTableBody({
  items,
}: {
  items: PartialProduct[] | [];
  onDelete?: (id: string) => void;
  onEdit?: (item: PartialProduct) => void;
}) {
  const { user } = useUser();
  const [openAlert, setOpenAlert] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<PartialProduct | null>(null);

  return (
    <TableBody>
      {items.length ? (
        items.map((item: PartialProduct) => (
          <TableRow key={item?._id}>
            <TableCell>{item.size || "-"}</TableCell>
            <TableCell>{item.stock}</TableCell>
            <TableCell align="right">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => setOpenModal(item)}
                disabled={user?.role !== "admin"}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full"
                onClick={() => setOpenAlert(item._id!)}
                disabled={user?.role !== "admin"}
              >
                <Trash2 size={16} />
              </Button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={9} className="text-center h-60">
            No hay productos
          </TableCell>
        </TableRow>
      )}
      <CustomAlertDialog
        open={!!openAlert}
        onClose={() => setOpenAlert(null)}
        title="Eliminar producto"
        description="¿Estas seguro que deseas eliminar este producto?"
        onAccept={async () => {
          const res = await deleteProduct(openAlert!);
          if (res.success) {
            toast.success(res.message);
            setOpenAlert(null);
          } else {
            toast.error(res.message);
          }
        }}
      />
      <EditProductModal
        item={openModal!}
        open={!!openModal}
        onClose={() => setOpenModal(null)}
      />
    </TableBody>
  );
}

export default ItemTableBody;
