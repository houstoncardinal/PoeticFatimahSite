import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2 } from "lucide-react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useToast } from "@/hooks/use-toast";
import type { Poem } from "@shared/schema";

export default function PoemView() {
  const { slug } = useParams();
  const { toast } = useToast();

  const { data: poem, isLoading } = useQuery<Poem>({
    queryKey: ["/api/poems/by-slug", slug],
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poem?.title,
          text: `Read "${poem?.title}" by Fatimah`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Poem link copied to clipboard.",
      });
    }
  };

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

  if (!poem) {
    return (
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">Poem Not Found</h1>
          <Link href="/poetry">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Poetry
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/poetry">
          <Button variant="ghost" className="gap-2 mb-8" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            All Poetry
          </Button>
        </Link>

        <article>
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6" data-testid="text-poem-title">
              {poem.title}
            </h1>
            
            {poem.themes && poem.themes.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {poem.themes.map((theme, idx) => (
                  <Badge key={idx} variant="secondary" data-testid={`badge-theme-${idx}`}>
                    {theme}
                  </Badge>
                ))}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="gap-2"
              data-testid="button-share"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </header>

          {poem.audioUrl && (
            <div className="mb-12">
              <AudioPlayer
                audioUrl={poem.audioUrl}
                title={poem.title}
                transcript={poem.transcript || undefined}
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none text-center mb-12">
            <div className="whitespace-pre-wrap leading-relaxed text-lg" data-testid="text-poem-body">
              {poem.body}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
