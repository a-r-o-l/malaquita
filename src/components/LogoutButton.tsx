"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

function LogoutButton({
  icon,
  variant,
  className,
}: {
  icon: React.ReactNode;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className: string;
}) {
  return (
    <form
      action={async () => {
        await signOut({
          redirectTo: "/login",
        });
      }}
    >
      <Button variant={variant} className={className}>
        {icon}
        Logout
      </Button>
    </form>
  );
}

export default LogoutButton;
