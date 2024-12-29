import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface UserSales {
  [key: string]: number;
}
function SalesChart({ userSales }: { userSales: UserSales[] }) {
  const userKeys =
    userSales.length > 0
      ? Object.keys(userSales[0]).filter((key) => key !== "date")
      : [];

  const chartConfig = userKeys.reduce((acc, key) => {
    acc[key] = {
      label: key,
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[350px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={userSales}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        <ChartLegend
          content={<ChartLegendContent />}
          verticalAlign="top"
          height={36}
        />
        {userKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`hsl(var(--chart-${index + 1}))`}
            barSize={userSales.length > 1 ? 300 / userSales.length : 32}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
  // return (
  //   <ChartContainer
  //     config={chartConfig}
  //     className="aspect-auto h-[250px] w-full"
  //   >
  //     <BarChart
  //       accessibilityLayer
  //       data={Object.values(groupedSales)}
  //       margin={{
  //         left: 12,
  //         right: 12,
  //       }}
  //     >
  //       <CartesianGrid vertical={false} />
  //       <XAxis
  //         dataKey="date"
  //         tickLine={false}
  //         axisLine={false}
  //         tickMargin={8}
  //         minTickGap={32}
  //         tickFormatter={(value) => {
  //           const date = new Date(value);
  //           return date.toLocaleDateString("en-US", {
  //             month: "short",
  //             day: "numeric",
  //           });
  //         }}
  //       />
  //       <ChartTooltip
  //         content={
  //           <ChartTooltipContent
  //             className="w-[150px]"
  //             nameKey="asd"
  //             labelFormatter={(value) => {
  //               return new Date(value).toLocaleDateString("en-US", {
  //                 month: "short",
  //                 day: "numeric",
  //                 year: "numeric",
  //               });
  //             }}
  //             indicator="dot"
  //           />
  //         }
  //       />
  //       <Bar dataKey={"total"} fill={`hsl(var(--chart-6))`} />
  //     </BarChart>
  //   </ChartContainer>
  // );
}

export default SalesChart;
