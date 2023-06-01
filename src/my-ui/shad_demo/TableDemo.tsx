import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./TableParts";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed525",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed544",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52fgfg",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52ggf",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

export function TableDemo() {
  const data = getData();
  return (
    <div className="w-full flex-grow container mx-auto py-10">
      {/* @ts-expect-error */}
      <DataTable columns={columns} data={data} />
    </div>
  );
}
