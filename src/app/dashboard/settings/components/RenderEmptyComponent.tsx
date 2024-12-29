"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function RenderEmptyComponent() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/settings/categories");
  }, [router]);
  return <div></div>;
}

export default RenderEmptyComponent;
