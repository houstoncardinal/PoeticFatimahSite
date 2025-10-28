import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import type { JournalPost } from "@shared/schema";
import { format } from "date-fns";

export default function JournalPostView() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery<JournalPost>({
    queryKey: ["/api/journal", slug],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Skeleton className="h-12 w-96 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/journal">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Journal
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/journal">
          <Button variant="ghost" className="gap-2 mb-8" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            All Journal Entries
          </Button>
        </Link>

        <article>
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline" data-testid="badge-category">
                {post.category}
              </Badge>
              <span className="text-muted-foreground" data-testid="text-date">
                {format(new Date(post.createdAt), "MMMM d, yyyy")}
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" data-testid="text-post-title">
              {post.title}
            </h1>
          </header>

          {post.imageUrl && (
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-12" data-testid="img-post">
              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {post.audioUrl && (
            <div className="mb-12">
              <AudioPlayer
                audioUrl={post.audioUrl}
                title={post.title}
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none" data-testid="text-post-body">
            <div className="whitespace-pre-wrap leading-relaxed text-lg">
              {post.body}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 pt-16 border-t">
            <div className="bg-accent/30 rounded-lg p-8 text-center">
              <h3 className="font-serif text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-muted-foreground mb-6">
                Get new journal entries, poetry releases, and show dates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild data-testid="button-subscribe">
                  <Link href="/#newsletter">Subscribe to Newsletter</Link>
                </Button>
                <Button variant="secondary" asChild data-testid="button-shop">
                  <Link href="/shop">Shop the Poem</Link>
                </Button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
