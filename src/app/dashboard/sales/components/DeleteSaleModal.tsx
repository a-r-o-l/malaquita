"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { Trash } from "lucide-react";
import { useState } from "react";

function DeleteSaleModal() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user || user.role !== "admin") {
    return null;
  }
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => setOpen(true)}
      >
        <Trash />
      </Button>
      <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
        <AlertDialogContent aria-hidden>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Estas seguro de querer eliminar esta venta?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button>Aceptar</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default DeleteSaleModal;
