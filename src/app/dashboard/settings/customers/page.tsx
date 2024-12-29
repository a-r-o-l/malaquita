import GoToButton from "../../../../components/GoToButton";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { searchCustomers } from "@/actions/customerActions";
import CustomerTableRow from "../components/CustomerTableRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchCustomerInput from "../components/SearchCustomerInput";
interface SearchParams {
  search?: string;
}
export default async function CustomersScreen({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const param = await searchParams;
  const search = param.search || "";
  const customers = await searchCustomers(search);
  return (
    <div className="container mx-auto p-5 py-20">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>Clientes</CardTitle>
            <GoToButton
              title="Crear cliente"
              goTo="/dashboard/settings/customers/new"
              className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <SearchCustomerInput />
          </div>
          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Dni</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefono</TableHead>
                <TableHead>Direccion</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!!customers?.length ? (
                customers.map((customer) => (
                  <CustomerTableRow key={customer?._id} customer={customer} />
                ))
              ) : (
                <TableRow>
                  <td colSpan={7} className="text-center">
                    No hay clientes
                  </td>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
