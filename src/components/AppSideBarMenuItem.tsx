"use client";
import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AppSideBarMenuItem({
  item,
  role,
}: {
  item: {
    title: string;
    url: string;
    icon: React.FC;
    private: boolean;
  };
  role: string;
}) {
  const pathname = usePathname();
  const isActive =
    item.url === "/dashboard"
      ? pathname === item.url
      : pathname.startsWith(item.url);
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <Link
          href={item.url}
          className={`${isActive ? "bg-fuchsia-500 text-white" : ""}`}
          aria-disabled={item.private && role !== "admin"}
        >
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default AppSideBarMenuItem;
