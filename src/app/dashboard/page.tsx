import { getAllAccounts } from "@/actions/accountActions";
import { getSalesBetweenUsers } from "@/actions/salesActions";
import { HomeScreenComponent } from "@/components/HomeScreenComponent";
import React from "react";

export default async function HomeScreen({
  searchParams,
}: {
  searchParams: Promise<{ start: string; end: string; user: string }>;
}) {
  const param = await searchParams;
  const start = param.start;
  const end = param.end;
  const user = param.user;
  const users = await getAllAccounts();
  const userSales = await getSalesBetweenUsers(start, end, user);

  return (
    <div className="container mx-auto p-5 py-20">
      <HomeScreenComponent users={users} userSales={userSales} />
    </div>
  );
}
