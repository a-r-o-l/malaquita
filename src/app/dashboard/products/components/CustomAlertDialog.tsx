"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type AlertDialogProps = {
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  onCancel?: () => void;
  CancelTitle?: string;
  AcceptTitle?: string;
  description: string;
  title: string;
};

function CustomAlertDialog({
  open,
  onClose,
  onAccept,
  onCancel,
  CancelTitle,
  AcceptTitle,
  description,
  title,
}: AlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onCancel) {
                onCancel();
              } else {
                onClose();
              }
            }}
          >
            {CancelTitle || "Cancelar"}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAccept();
            }}
          >
            {AcceptTitle || "Aceptar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CustomAlertDialog;
