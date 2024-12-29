"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";
import { Loader } from "lucide-react";

interface Props extends ButtonProps {
  className?: string;
  pendingText?: string;
  isPending?: boolean;
  disabled?: boolean;
}

function PendingButton({
  className,
  pendingText,
  disabled = false,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  const pendingOrIsPending = pending || props.isPending;

  return (
    <Button
      {...props}
      className={className}
      disabled={pendingOrIsPending || disabled}
    >
      {pendingOrIsPending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" /> {pendingText}
        </>
      ) : (
        props.children
      )}
    </Button>
  );
}

export default PendingButton;
