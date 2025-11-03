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
          {/* Elfsight Instagram Feed Widget */}
          <div className="elfsight-app-00ab40be-bcbf-4670-a0bd-d4b11781265b" data-elfsight-app-lazy></div>
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
