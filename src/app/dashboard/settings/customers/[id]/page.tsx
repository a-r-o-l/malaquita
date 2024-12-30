import { PartialCustomer } from "@/models/Customer";
import React from "react";
import { getCustomer } from "@/actions/customerActions";
import GoToButton from "../../../../../components/GoToButton";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getAllSalesByCustomer } from "@/actions/salesActions";
import dayjs from "dayjs";
import { ISaleWPop } from "@/models/Sale";
import { priceParser } from "@/functions/productsHandler";
import BackButton from "@/app/dashboard/products/components/BackButton";

async function CustomerDetailsScreen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const customer: PartialCustomer | null = await getCustomer(param.id);
  const sales = await getAllSalesByCustomer(param.id);
  if (!customer) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <div className="flex flex-1 flex-col w-1/2">
          <div className="text-center">
            <h1 className="font-bold text-xl">Cliente no encontrado</h1>
          </div>
          <div className="w-full space-y-2">
            <GoToButton title="Volver" goTo="/dashboard/settings/customers" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="flex justify-start w-1/2">
        <BackButton url="/dashboard/settings/customers" />
      </div>
      <Card className="w-1/2 mt-10">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Cliente</CardTitle>
              <CardDescription>Informacion del cliente</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Trash />
            </Button>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Nombre</p>
              <p className="text-sm">{customer.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Apellido</p>
              <p className="text-sm">{customer.lastname}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Dni</p>
              <p className="text-sm"> {customer.dni}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Email</p>
              <p className="text-sm">{customer.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Direccion</p>
              <p className="text-sm">{customer.address}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Telefono</p>
              <p className="text-sm">{customer.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-1/2 mt-10">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Compras</CardTitle>
              <CardDescription>
                Compras realizadas por el cliente
              </CardDescription>
            </div>
          </div>

          <Separator />
        </CardHeader>
        <CardContent>
          <div>
            <Table>
              <TableHeader className="bg-zinc-800 text-white">
                <TableRow>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Pago</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!!sales?.length ? (
                  sales.map((sale: ISaleWPop) => (
                    <TableRow key={sale._id}>
                      <TableCell>{sale?.accountId?.username}</TableCell>
                      <TableCell>
                        {dayjs(sale?.date).format("DD/MM/YY hh:ss")}
                      </TableCell>
                      <TableCell>{priceParser(sale?.total)}</TableCell>
                      <TableCell>{priceParser(sale?.pay)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No hay ventas
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerDetailsScreen;
