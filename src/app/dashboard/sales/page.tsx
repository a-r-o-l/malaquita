import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllSalesByDate } from "@/actions/salesActions";
import dayjs from "dayjs";
import GoToButton from "../../../components/GoToButton";
import { ISaleWPop } from "@/models/Sale";
import { Label } from "@/components/ui/label";
import DatePicker from "@/components/DatePicker";
import UserSelect from "@/components/UserSelect";
import { getAllAccounts } from "@/actions/accountActions";
import { priceParser } from "@/functions/productsHandler";

interface SearchParams {
  start?: string;
  end?: string;
  user?: string;
}

export default async function SalesScreen({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const users = await getAllAccounts();
  const param = await searchParams;
  const start = param.start || "";
  const end = param.end || "";
  const user = param.user || "";
  const sales = await getAllSalesByDate(start, end, user);
  return (
    <div className="container mx-auto p-5 py-20">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Ventas</CardTitle>
          <div className="flex gap-10">
            <div className="flex gap-4 p-4 items-center w-[300px]">
              <Label>Fecha</Label>
              <DatePicker url="/dashboard/sales" />
            </div>
            <div className="flex gap-4 p-4 items-center w-[300px] justify-start">
              <Label>Usuario</Label>
              <UserSelect users={users} url="/dashboard/sales" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Pago</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length ? (
                sales.map((sale: ISaleWPop) => (
                  <TableRow key={sale._id}>
                    <TableCell>{sale.accountId.username}</TableCell>
                    <TableCell>{dayjs(sale.date).format("DD/MM/YY")}</TableCell>
                    <TableCell>{dayjs(sale.date).format("hh:ss")}</TableCell>
                    <TableCell>{sale.type}</TableCell>
                    <TableCell>{priceParser(sale.total)}</TableCell>
                    <TableCell>{priceParser(sale.total)}</TableCell>
                    <TableCell align="right">
                      <GoToButton
                        variant="link"
                        goTo={`/dashboard/sales/${sale._id}`}
                        title="Ver"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-60">
                    No hay ventas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
