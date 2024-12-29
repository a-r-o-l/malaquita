"use client";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { PartialCustomer } from "@/models/Customer";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function CustomerTableRow({ customer }: { customer: PartialCustomer }) {
  const router = useRouter();

  return (
    <TableRow
      key={customer?._id}
      className="cursor-pointer"
      onClick={() => {
        router.push(`/dashboard/settings/customers/${customer?._id}`);
      }}
    >
      <TableCell className="text-start">{customer?.name}</TableCell>
      <TableCell>{customer?.lastname}</TableCell>
      <TableCell>{customer?.dni}</TableCell>
      <TableCell>{customer?.email}</TableCell>
      <TableCell>{customer?.phone}</TableCell>
      <TableCell>{customer?.address}</TableCell>
      <TableCell className="text-right">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={() =>
            router.push(`/dashboard/settings/customers/${customer?._id}`)
          }
        >
          <Pencil size={16} />
        </Button>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Trash2 size={16} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default CustomerTableRow;
