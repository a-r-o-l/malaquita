"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function AppSideBarLogo() {
  const { theme } = useTheme();
  return (
    <Image
      src={theme === "dark" ? "/logoBlanco.png" : "/logonegro.png"}
      alt={`Malaquita`}
      width={350}
      height={10}
      priority
    />
  );
}

export default AppSideBarLogo;
