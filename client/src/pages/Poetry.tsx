import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import type { Collection } from "@shared/schema";

export default function Poetry() {
  const { data: collections, isLoading } = useQuery<Collection[]>({
    queryKey: ["/api/collections"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6">
          <Skeleton className="h-16 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-6" data-testid="text-page-title">
          Poetry Collections
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Explore curated collections of poems exploring healing, identity, love, and the quiet courage it takes to feel deeply.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {collections?.map((collection) => (
            <Link key={collection.id} href={`/poetry/${collection.slug}`}>
              <Card className="h-full hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-collection-${collection.id}`}>
                <CardHeader>
                  <CardTitle className="font-serif text-3xl" data-testid={`text-collection-title-${collection.id}`}>
                    {collection.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`text-collection-description-${collection.id}`}>
                    {collection.description}
                  </p>
                  <div className="flex items-center text-primary gap-2">
                    <span className="text-sm font-medium">Explore Collection</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {(!collections || collections.length === 0) && !isLoading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No collections available yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
