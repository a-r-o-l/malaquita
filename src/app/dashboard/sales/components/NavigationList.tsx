"use client";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenuItem } from "@/components/NavigationMenuButton";
import { BadgeDollarSign, CalendarPlus, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const items = [
  {
    href: "/dashboard/sales",
    label: "Ventas",
    icon: BadgeDollarSign,
  },
  {
    href: "/dashboard/sales/new",
    label: "Nueva venta",
    icon: CalendarPlus,
  },
];

function NavigationList() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {items.map((item: NavigationItem) => {
          const isActive =
            item.href === "/dashboard/sales" &&
            pathname === "/dashboard/sales/new"
              ? false
              : pathname.startsWith(item.href);
          return (
            <NavigationMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={isActive}
                >
                  <item.icon size={16} className="mr-3" />
                  {item.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavigationList;
