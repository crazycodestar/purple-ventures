import { collectionsAPI } from "@/api";
import { Filters, useFilter } from "@/components/filters";
import { Skeleton } from "@/components/ui/skeleton";
import { useStoreSlug } from "@/hooks/use-store-slug";
import { createFileRoute } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/browse/$category/")({
  loader: async ({ params: { category } }) => {
    const { storeSlug } = useStoreSlug();
    const result = await collectionsAPI.getCategoryByIdAndStoreSlug(
      storeSlug,
      category
    );
    return { category: result };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { storeSlug } = useStoreSlug();
  const { category: categoryId } = Route.useParams();

  const [properties, setProperties] = useState<any>(null);
  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { handleTogglePropertyFilter, isChecked, filterByPropertyId } =
    useFilter(properties);

  useEffect(() => {
    const fetchData = async () => {
      if (!storeSlug || !categoryId) return;

      setIsLoading(true);
      try {
        const [propertiesData, categoryData] = await Promise.all([
          collectionsAPI.getFilters(storeSlug),
          collectionsAPI.getCategoryByIdAndStoreSlug(storeSlug, categoryId),
        ]);

        setProperties(propertiesData);
        setCategory(categoryData);
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [storeSlug, categoryId]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeSlug || !categoryId) return;

      const getProperties = () => {
        const filterByPropertyIdEntries = Object.entries(filterByPropertyId);
        const shouldCall = filterByPropertyIdEntries.some(
          (p) => p[1].length > 0
        );
        if (!shouldCall) return;
        return filterByPropertyIdEntries.map(([key, value]) => ({
          key,
          value,
        }));
      };

      try {
        const data = await collectionsAPI.getProductsByCategoryIdAndStoreSlug(
          storeSlug,
          categoryId,
          getProperties()
        );
        setProducts(data as any[]);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [storeSlug, categoryId, filterByPropertyId]);

  const isPending = isLoading;

  const bottomRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="md:mx-8 py-4">
        {/* Page Title */}
        <div className="mb-4">
          {isPending ? (
            <Skeleton className="w-[200px] h-9" />
          ) : (
            <h1 className="text-2xl font-medium">{category?.name}</h1>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="sticky top-4">
              <div className="hidden md:block">
                <Filters
                  isChecked={isChecked}
                  onTogglePropertyFilter={handleTogglePropertyFilter}
                  properties={properties}
                />
              </div>

              {/* Mobile Filter Button */}
              <div className="md:hidden">
                <button className="w-full flex items-center justify-center gap-2 border rounded-full py-2 px-4">
                  <Filter className="h-4 w-4" />
                  <span>Filter & Sort</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {isPending && (
                <>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-full max-w-full flex flex-col gap-2"
                    >
                      <Skeleton className="w-full aspect-[3/4]" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-[70px] rounded-xs" />
                        <Skeleton className="h-4 w-[140px] rounded-xs" />
                      </div>
                    </div>
                  ))}
                </>
              )}
              {products?.map(
                (product) =>
                  product && (
                    <a
                      key={product._id}
                      href={`/prd/${product._id}`}
                      className="rounded-xl"
                    >
                      <div className="h-full max-w-full flex flex-col gap-2">
                        <img
                          src={
                            product.mainImage ??
                            "/placeholder.svg?height=400&width=300"
                          }
                          alt={product.name}
                          className="w-full aspect-[3/4] object-cover object-center bg-muted"
                        />
                        <div>
                          <h3>{product.name}</h3>
                          <p className="font-bold">
                            {product.price.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                            })}
                          </p>
                        </div>
                      </div>
                    </a>
                  )
              )}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
