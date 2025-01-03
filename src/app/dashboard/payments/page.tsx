import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllCurrentAccountsByDate } from "@/actions/salesActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ISaleWPop } from "@/models/Sale";
import PaymentTableRow from "./components/PaymentTableRow";
import DatePicker from "@/components/DatePicker";
import CustomersSelect from "@/components/CustomersSelect";
import { getAllCustomers } from "@/actions/customerActions";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SearchParams {
  start?: string;
  end?: string;
  customer?: string;
}

export default async function CustomersScreen({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const customersData = await getAllCustomers();
  const param = await searchParams;
  const start = param.start || "";
  const end = param.end || "";
  const customer = param.customer || "";
  const currentAccounts = await getAllCurrentAccountsByDate(
    start,
    end,
    customer
  );
  return (
    <div className="container mx-auto p-5 py-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cuentas corrientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-5 w-full flex flex-col gap-5 lg:flex-row">
            <div className="flex p-4 items-center justify-between w-[400px]">
              <Label className="w-24">Fecha</Label>
              <DatePicker url="/dashboard/payments" />
            </div>
            <div className="flex p-4 items-center justify-between w-[400px]">
              <Label className="w-24">Cliente</Label>
              <CustomersSelect
                url="/dashboard/payments"
                customers={customersData}
              />
            </div>
          </div>
          <ScrollArea className="relative h-[400px] w-full overflow-y-auto border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Estado</TableCell>
                  <TableCell>Usuario</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Pago</TableCell>
                  <TableCell>Saldo</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAccounts.length ? (
                  currentAccounts.map((sale: ISaleWPop) => (
                    <PaymentTableRow sale={sale} key={sale._id} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-60">
                      No hay ventas.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
