"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import React from "react";

function GoToButton({
  goTo,
  title,
  className,
  disabled = false,
  variant = "default",
  children,
  size = "default",
  privateAccess = false,
}: {
  children?: React.ReactNode;
  goTo: string;
  title?: string;
  className?: string;
  disabled?: boolean;
  privateAccess?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const router = useRouter();
  const { user } = useUser();

  return (
    <Button
      onClick={() => {
        router.push(goTo);
      }}
      className={className}
      variant={variant}
      type="button"
      disabled={disabled || (privateAccess && user?.role !== "admin")}
      size={size}
    >
      {title}
      {children}
    </Button>
  );
}

export default GoToButton;
