import AppSideBarLogo from "@/components/AppSideBarLogo";
import { LucideLoader2 } from "lucide-react";
import React from "react";

function loading() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center min-h-screen">
      <AppSideBarLogo />
      <LucideLoader2 size={30} className="animate-spin text-fuchsia-500" />
    </div>
  );
}

export default loading;
