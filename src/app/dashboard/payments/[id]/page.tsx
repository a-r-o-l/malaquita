import React from "react";
import GoToButton from "../../../../components/GoToButton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentAccount } from "@/actions/salesActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import { IProduct } from "@/models/Product";
import { getPaymentBySale } from "@/actions/paymentsActions";
import { IPaymentWP } from "@/models/Payment";
import CreatePaymentModal from "../components/CreatePaymentModal";
import BackButton from "../../products/components/BackButton";
import { Trash } from "lucide-react";

async function CurrentAccountDetailScreen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const sale = await getCurrentAccount(param.id);
  const items = sale.items;
  const payments: IPaymentWP[] | [] = await getPaymentBySale(param.id);

  const totalPayment = payments.reduce((acc, payment) => {
    return acc + payment.pay;
  }, 0);

  if (!sale) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <div className="flex flex-1 flex-col w-1/2">
          <div className="text-center">
            <h1 className="font-semibold text-xl">Venta no encontrada</h1>
          </div>
          <div className="w-full space-y-2">
            <GoToButton title="Volver" goTo="/dashboard/sales" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="w-1/2 flex justify-start">
        <BackButton url="/dashboard/payments" />
      </div>
      <Card className="w-1/2 mt-10">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Venta</CardTitle>
              <CardDescription>Informacion de la venta</CardDescription>
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
              <p className="font-semibold text-sm">Fecha</p>
              <p className="text-sm">
                {dayjs(sale.date).format("DD/MM/YY hh:ss")}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Usuario</p>
              <p className="text-sm">{sale.accountId.username}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Tipo de venta</p>
              <p className="text-sm"> {sale.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Cliente</p>
              <p className="text-sm">
                {sale.customerId.name} {sale.customerId.lastname}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-sm">Pago</p>
              <p className="text-sm">
                ${" "}
                {sale?.pay !== undefined ? sale.pay.toLocaleString("es-ES") : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-1/2 mt-10">
        <CardHeader>
          <CardTitle>Productos</CardTitle>
          <CardDescription>productos de la venta</CardDescription>
          <Separator />
        </CardHeader>
        <CardContent>
          <div>
            <Table>
              <TableHeader className="bg-zinc-800 text-white">
                <TableRow>
                  <TableCell>Codigo</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Talle</TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item: IProduct) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.size}</TableCell>
                    <TableCell align="right">
                      $ {item.price.toLocaleString("es-ES")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-semibold text-sm" colSpan={3}>
                    Total
                  </TableCell>
                  <TableCell align="right" className="font-semibold">
                    $ {sale.total.toLocaleString("es-ES")}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Card className="w-1/2 mt-10">
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <CardTitle>Pagos</CardTitle>
              <CardDescription>Pagos realizados de la venta</CardDescription>
            </div>
            <CreatePaymentModal
              sale={sale._id}
              customer={sale.customerId._id}
            />
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
                  <TableCell align="right">Importe</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!!payments?.length ? (
                  payments.map((payment: IPaymentWP) => (
                    <TableRow key={payment._id}>
                      <TableCell>{payment.account.username}</TableCell>
                      <TableCell>
                        {dayjs(payment.date).format("DD/MM/YY hh:ss")}
                      </TableCell>
                      <TableCell align="right">
                        $ {payment.pay.toLocaleString("es-ES")}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No hay pagos
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell className="font-semibold" align="left" colSpan={2}>
                    Total
                  </TableCell>
                  <TableCell className="font-semibold" align="right">
                    $ {totalPayment.toLocaleString("es-ES")}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CurrentAccountDetailScreen;
