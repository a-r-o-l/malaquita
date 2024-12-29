"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useMemo } from "react";
import { Label } from "./ui/label";
import { IAccount } from "@/models/Account";
import UserSelect from "@/components/UserSelect";
import DatePicker from "@/components/DatePicker";
import SalesChart from "@/app/dashboard/components/SalesChart";

interface UserSales {
  [key: string]: number;
}

export function HomeScreenComponent({
  users,
  userSales,
}: {
  users: IAccount[];
  userSales: UserSales[];
}) {
  const total = useMemo(() => {
    if (userSales.length) {
      return userSales.reduce((acc, curr) => {
        const userSales = Object.keys(curr).filter((key) => key !== "date");
        const totalForDate = userSales.reduce(
          (sum, user) => sum + curr[user],
          0
        );
        return acc + totalForDate;
      }, 0);
    }
    return 0;
  }, [userSales]);

  return (
    <Card>
      <div className="flex flex-col sm:flex-row gap-5 justify-between">
        <div className="flex gap-4 p-4 items-center w-[300px]">
          <Label>Fecha</Label>
          <DatePicker url="/dashboard" />
        </div>
        <div className="flex gap-4 p-4 items-center w-[300px] justify-start">
          <Label>Usuario</Label>
          <UserSelect users={users} url="/dashboard" />
        </div>
        <div className="flex border-b">
          {/* <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:border-l w-60">
            <span className="text-xs text-muted-foreground">
              Cantidad de ventas
            </span>
            <span className="text-lg font-bold whitespace-nowrap">{`${totalSales} ventas`}</span>
          </div> */}
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:border-l w-60">
            <span className="text-xs text-muted-foreground">
              Total recaudado
            </span>
            <span className="text-lg font-bold">
              $ {total.toLocaleString("es-ES")}
            </span>
          </div>
        </div>
      </div>

      <CardHeader className="flex flex-col border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Ventas</CardTitle>
          <CardDescription>filtrar por fecha y usuarios.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <SalesChart userSales={userSales} />
      </CardContent>
    </Card>
  );
}
