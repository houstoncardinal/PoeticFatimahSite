import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Headphones } from "lucide-react";
import type { JournalPost } from "@shared/schema";
import { format } from "date-fns";

const CATEGORIES = [
  "All",
  "Behind the poem",
  "On stage",
  "On craft",
  "Notes to self",
];

export default function Journal() {
  const { data: posts, isLoading } = useQuery<JournalPost[]>({
    queryKey: ["/api/journal"],
  });

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-6" data-testid="text-page-title">
          Journal
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Reflections on the craft, behind-the-scenes moments, and quiet notes from the creative process.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="text-base px-4 py-2 cursor-pointer hover-elevate"
              data-testid={`badge-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {posts?.map((post) => (
              <Link key={post.id} href={`/journal/${post.slug}`}>
                <Card className="hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-post-${post.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <Badge variant="outline" data-testid={`badge-post-category-${post.id}`}>
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground" data-testid={`text-post-date-${post.id}`}>
                        {format(new Date(post.createdAt), "MMMM d, yyyy")}
                      </span>
                    </div>
                    <CardTitle className="font-serif text-3xl flex items-center gap-3" data-testid={`text-post-title-${post.id}`}>
                      {post.title}
                      {post.audioUrl && (
                        <Headphones className="h-5 w-5 text-primary" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-muted-foreground line-clamp-3 mb-4" data-testid={`text-post-excerpt-${post.id}`}>
                      {post.excerpt || post.body.substring(0, 200) + "..."}
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

        {!isLoading && (!posts || posts.length === 0) && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No journal entries yet. Check back soon for reflections and behind-the-scenes notes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
