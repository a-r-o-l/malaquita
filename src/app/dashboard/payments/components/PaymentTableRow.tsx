import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import GoToButton from "../../../../components/GoToButton";
import { ISaleWPop } from "@/models/Sale";
import dayjs from "dayjs";

function PaymentTableRow({ sale }: { sale: ISaleWPop }) {
  const balance =
    sale.total !== undefined && sale.pay !== undefined
      ? sale.total - sale.pay
      : 0;
  return (
    <TableRow key={sale._id}>
      <TableCell>
        <div
          className={`h-2 w-2 rounded-full ${
            sale.pay < sale.total ? "bg-red-500" : "bg-green-500"
          }`}
        ></div>
      </TableCell>
      <TableCell>{sale.accountId.username}</TableCell>
      <TableCell>{dayjs(sale.date).format("DD/MM/YY hh:ss")}</TableCell>
      <TableCell>
        {sale?.customerId?.name} {sale?.customerId?.lastname}
      </TableCell>
      <TableCell>
        $ {sale.total !== undefined ? sale.total.toLocaleString("es-ES") : 0}
      </TableCell>
      <TableCell>
        $ {sale.pay !== undefined ? sale.pay.toLocaleString("es-ES") : 0}
      </TableCell>
      <TableCell>
        {balance > 0 ? `$ ${balance.toLocaleString("es-ES")}` : "-"}
      </TableCell>
      <TableCell align="right">
        <GoToButton
          variant="link"
          goTo={`/dashboard/payments/${sale._id}`}
          title="Ver"
        />
      </TableCell>
    </TableRow>
  );
}

export default PaymentTableRow;
