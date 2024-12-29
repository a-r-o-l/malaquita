import { LucideLoader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

function loading() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center min-h-screen">
      <Image
        src={"/logo-crud.png"}
        alt={`Malaquita`}
        width={350}
        height={10}
        priority
      />
      <LucideLoader2 size={30} className="animate-spin text-fuchsia-500" />
    </div>
  );
}

export default loading;
