import { getProducts } from "@/lib/api/api-client";
import { ProductTable } from "@/components/products/ProductTable";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductForm } from "@/components/products/ProductForm";
import { ViewDialog } from "@/components/products/ViewDialog";
import { DeleteDialog } from "@/components/products/DeleteDialog";

export function generateMetadata({ searchParams }: ProductsPageProps) {
  const searchQuery = searchParams.search as string;
  
  return {
    title: searchQuery 
      ? `Products - Search: ${searchQuery}` 
      : 'Products - Inventory Management',
    description: searchQuery
      ? `Search results for "${searchQuery}" in product inventory`
      : 'Manage your product inventory, add new products, and update existing ones',
  };
}

interface ProductsPageProps {
  searchParams: { 
    [key: string]: string | string[] | undefined;
    search?: string;
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const queryClient = new QueryClient();

  const searchQuery = searchParams.search as string | undefined;
  const page = parseInt((searchParams.page as string) || "1");
  const limit = 10;
  const offset = (page - 1) * limit;

  // Prepare query parameters
  const queryParams = {
    title: searchQuery,
    offset,
    limit,
  };

  await queryClient.prefetchQuery({
    queryKey: ["products", queryParams],
    queryFn: () => getProducts(queryParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return (
    <div className="container mx-auto py-10">

      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground mt-2">
              Manage your product inventory and catalog
            </p>
          </div>
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductTable />
        
        <ProductForm />
        <ViewDialog />
        <DeleteDialog />
      </HydrationBoundary>
    </div>
  );
}