import { getProducts } from "@/lib/api/api-client";
import { ProductTable } from "@/components/products/ProductTable";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { Hydrate } from "@/providers/Hydrate";
import { ProductForm } from "@/components/products/ProductForm";
import { ViewDialog } from "@/components/products/ViewDialog";
import { DeleteDialog } from "@/components/products/DeleteDialog";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products", searchParams],
    queryFn: () =>
      getProducts({
        title: searchParams.search as string,
        offset: 0,
        limit: 10,
      }),
  });

  return (
    <div className="container mx-auto py-10">
      <Hydrate state={dehydrate(queryClient)}>
        <ProductTable
          products={[]} // Will be filled by client component
          totalCount={0} // Will be filled by client component
        />
        <ProductForm />
        <ViewDialog />
        <DeleteDialog />
      </Hydrate>
    </div>
  );
}