import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Collection, Poem } from "@shared/schema";

export default function CollectionView() {
  const { slug } = useParams();

  const { data: collection, isLoading: collectionLoading } = useQuery<Collection>({
    queryKey: ["/api/collections", slug],
  });

  const { data: poems, isLoading: poemsLoading } = useQuery<Poem[]>({
    queryKey: ["/api/poems", { collectionId: collection?.id }],
    enabled: !!collection?.id,
  });

  if (collectionLoading) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <Skeleton className="h-16 w-96 mb-8" />
          <Skeleton className="h-24 w-full mb-12" />
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Collection Not Found</h1>
          <Link href="/poetry">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Collections
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link href="/poetry">
          <Button variant="ghost" className="gap-2 mb-8" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            All Collections
          </Button>
        </Link>

        <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6" data-testid="text-collection-title">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl" data-testid="text-collection-description">
            {collection.description}
          </p>
        )}

        {poemsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {poems?.map((poem) => (
              <Link key={poem.id} href={`/poetry/poem/${poem.slug}`}>
                <Card className="h-full hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-poem-${poem.id}`}>
                  <CardHeader>
                    <CardTitle className="font-serif text-2xl" data-testid={`text-poem-title-${poem.id}`}>
                      {poem.title}
                    </CardTitle>
                    {poem.themes && poem.themes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {poem.themes.slice(0, 3).map((theme, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4" data-testid={`text-poem-excerpt-${poem.id}`}>
                      {poem.excerpt || poem.body.substring(0, 150) + "..."}
                    </p>
                    <div className="flex items-center text-primary gap-2">
                      <span className="text-sm font-medium">Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!poemsLoading && (!poems || poems.length === 0) && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No poems in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
