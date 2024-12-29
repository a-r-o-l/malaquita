"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { BetweenHorizonalEnd, UserCircle, Users2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const items = [
    {
      href: "/dashboard/settings/categories",
      label: "Categorias",
      icon: BetweenHorizonalEnd,
    },
    {
      href: "/dashboard/settings/accounts",
      label: "Usuarios",
      icon: UserCircle,
    },
    {
      href: "/dashboard/settings/customers",
      label: "Clientes",
      icon: Users2,
    },
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            {items.map((item) => (
              <NavigationMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname.startsWith(item.href)}
                  >
                    <item.icon size={16} className="mr-3" />
                    {item.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {children}
    </div>
  );
}
