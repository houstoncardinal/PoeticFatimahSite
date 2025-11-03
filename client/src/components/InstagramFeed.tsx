import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function InstagramFeed() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold mb-4">Follow the Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Daily poetry, performance moments, and creative inspiration from @poeticallyfathmah
          </p>
        </div>

        {/* Instagram Embed Container */}
        <div className="mb-8">
          <Card className="p-8 text-center">
            <Instagram className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Instagram Feed Coming Soon</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              To add your live Instagram feed, connect your Instagram Business account using a feed widget service like Elfsight or EmbedSocial.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                <strong>Quick Setup:</strong>
              </p>
              <ol className="text-sm text-muted-foreground text-left max-w-md mx-auto space-y-2">
                <li>1. Visit <a href="https://elfsight.com/instagram-feed-instashow/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Elfsight Instagram Feed</a></li>
                <li>2. Create your free widget and connect @poeticallyfathmah</li>
                <li>3. Copy the embed code</li>
                <li>4. Paste it in this component (InstagramFeed.tsx)</li>
              </ol>
            </div>
            
            {/* Elfsight Instagram Feed Widget */}
            <div className="elfsight-app-00ab40be-bcbf-4670-a0bd-d4b11781265b" data-elfsight-app-lazy></div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button asChild size="lg" data-testid="button-follow-instagram">
            <a 
              href="https://www.instagram.com/poeticallyfathmah" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Instagram className="h-5 w-5" />
              Follow @poeticallyfathmah
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
