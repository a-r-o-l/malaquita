import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Initialcreen() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  return <div></div>;
}
