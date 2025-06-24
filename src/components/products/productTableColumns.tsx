"use client";

import { IProduct } from "@/lib/models/product";
import { ColumnDef } from "@tanstack/react-table";
import { ProductActionsCell } from "./ProductActionsCell";

export const productTableColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category.name",
    header: "Category",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return <ProductActionsCell product={product} />;
    },
  },
];