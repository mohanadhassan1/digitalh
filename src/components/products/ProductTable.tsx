"use client";

import { IProduct } from "@/lib/models/product";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useProductStore } from "@/lib/store/product-store";
import { useRouter, useSearchParams } from "next/navigation";
import { DataTable } from "@/UI/data-table";
import { Input } from "../ui/input";
import { useDebouncedCallback } from "use-debounce";

interface ProductTableProps {
  products: IProduct[];
  totalCount: number;
}

export const columns: ColumnDef<IProduct>[] = [
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
      const { setSelectedProduct, setViewDialogOpen, setEditDialogOpen } =
        useProductStore();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedProduct(product);
                setViewDialogOpen(true);
              }}
            >
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedProduct(product);
                setEditDialogOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedProduct(product);
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ProductTable({ products, totalCount }: ProductTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAddDialogOpen } = useProductStore();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    router.replace(`/products?${params.toString()}`);
  }, 300);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search products..."
          defaultValue={searchParams.get("search")?.toString() || ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => setAddDialogOpen(true)}>Add Product</Button>
      </div>
      <DataTable
        columns={columns}
        data={products}
        totalCount={totalCount}
        pageSize={10}
      />
    </div>
  );
}