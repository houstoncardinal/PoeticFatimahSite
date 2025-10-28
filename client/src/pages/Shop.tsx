import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@shared/schema";

export default function Shop() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-6" data-testid="text-page-title">
          Shop
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          Books, prints, and limited editions. Each piece a keeper, signed with intention.
        </p>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products?.map((product) => (
              <Card key={product.id} className="overflow-hidden flex flex-col" data-testid={`card-product-${product.id}`}>
                <div className="aspect-[4/5] bg-muted" data-testid={`img-product-${product.id}`}>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Product Image
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-serif text-2xl" data-testid={`text-product-title-${product.id}`}>
                    {product.title}
                  </CardTitle>
                  <p className="text-primary font-bold text-xl" data-testid={`text-product-price-${product.id}`}>
                    {product.priceText}
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4" data-testid={`text-product-blurb-${product.id}`}>
                    {product.blurb}
                  </p>
                  {product.details && (
                    <p className="text-sm text-muted-foreground" data-testid={`text-product-details-${product.id}`}>
                      {product.details}
                    </p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" data-testid={`button-buy-product-${product.id}`}>
                    <a href={product.buyUrl} target="_blank" rel="noopener noreferrer">
                      View Details
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && (!products || products.length === 0) && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              New items coming soon. Check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
