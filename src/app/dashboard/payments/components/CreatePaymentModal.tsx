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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createPayment } from "@/actions/paymentsActions";
import { useUser } from "@/context/UserContext";

function CreatePaymentModal({
  sale,
  customer,
}: {
  sale: string;
  customer: string;
}) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (sale) {
      if (sale) formData.append("sale", sale);
      if (customer) formData.append("customer", customer);
      if (user) formData.append("account", user.id);

      const response = await createPayment(formData);
      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        setOpen(false);
      }
    }
  };

  return (
    <div>
      <Button
        className="rounded-full bg-fuchsia-500 hover:bg-fuchsia-700 text-white"
        onClick={() => setOpen(true)}
      >
        Crear pago
      </Button>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <div className="dialog-header">
            <DialogTitle>Crear un nuevo pago</DialogTitle>
            <DialogDescription></DialogDescription>
          </div>
          <form
            className="flex flex-col gap-5 items-start"
            onSubmit={handleSubmit}
          >
            <div className="w-full space-y-2">
              <Label htmlFor="date">Fecha y hora</Label>
              <Input type="datetime-local" name="date" id="date" />
            </div>
            <div className="w-full space-y-2">
              <Label htmlFor="pay">Importe</Label>
              <Input
                placeholder="Ingresa el importe"
                type="number"
                name="pay"
                id="pay"
              />
            </div>
            <div className="w-full flex mt-5 justify-center">
              <PendingButton className="w-40 bg-fuchsia-500 hover:bg-fuchsia-700 text-white">
                Crear pago
              </PendingButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatePaymentModal;
