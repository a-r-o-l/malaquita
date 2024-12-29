"use client";
import { BadgeDollarSign, Home, Settings, Shirt } from "lucide-react";
import { MdOutlinePayments } from "react-icons/md";
import AppSideBarMenuItem from "./AppSideBarMenuItem";
import { useUser } from "@/context/UserContext";

const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
    private: false,
  },
  {
    title: "Productos",
    url: "/dashboard/products",
    icon: Shirt,
    private: false,
  },
  {
    title: "Ventas",
    url: "/dashboard/sales",
    icon: BadgeDollarSign,
    private: false,
  },
  {
    title: "Cuentas Corrientes",
    url: "/dashboard/payments",
    icon: MdOutlinePayments,
    private: false,
  },
  {
    title: "Configuraciones",
    url: "/dashboard/settings",
    icon: Settings,
    private: true,
  },
];

function AppSideBarMenu() {
  const { user } = useUser();

  return (
    <>
      {items.map((item) => {
        return (
          <AppSideBarMenuItem
            key={item.title}
            item={item}
            role={user?.role || "user"}
          />
        );
      })}
    </>
  );
}

export default AppSideBarMenu;
