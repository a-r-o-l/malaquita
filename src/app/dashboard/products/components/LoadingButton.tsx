import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";

function LoadingButton({
  loading,
  disabled,
  title,
  classname,
  type = "button",
  variant = "default",
}: {
  loading?: boolean;
  disabled?: boolean;
  title: string;
  classname?: string;
  type?: "button" | "submit" | "reset";
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
}) {
  return (
    <Button
      className={classname}
      type={type}
      disabled={loading || disabled}
      variant={variant}
    >
      {loading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <p>{title}</p>
      )}
    </Button>
  );
}

export default LoadingButton;
