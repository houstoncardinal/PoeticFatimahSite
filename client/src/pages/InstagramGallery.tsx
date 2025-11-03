import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";

export default function InstagramGallery() {
  return (
    <>
      <SEOHead
        title="Instagram | Poetically Fatimah"
        description="Follow @poeticallyfathmah for daily poetry, performances, and creative inspiration. Connect with Fatimah's poetic journey on Instagram."
        image="/og-instagram.jpg"
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Instagram className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h1 className="text-5xl font-serif font-bold mb-6">
              @poeticallyfathmah
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Daily doses of poetry, performance clips, and authentic creative moments. 
              Join the community and be part of the journey.
            </p>
            <Button asChild size="lg" data-testid="button-follow-instagram-hero">
              <a 
                href="https://www.instagram.com/poeticallyfathmah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Instagram className="h-5 w-5" />
                Follow on Instagram
              </a>
            </Button>
          </div>
        </section>

        {/* Instagram Grid Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-serif font-bold mb-4">Latest from Instagram</h2>
              <p className="text-muted-foreground">
                Real-time feed of poetry, performances, and creative inspiration
              </p>
            </div>

            {/* Instagram Embed Container */}
            <div className="elfsight-app-00ab40be-bcbf-4670-a0bd-d4b11781265b" data-elfsight-app-lazy></div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Don't Miss a Word
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get daily inspiration, behind-the-scenes moments, and exclusive content on Instagram
            </p>
            <Button asChild size="lg" data-testid="button-follow-instagram-bottom">
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
        </section>
      </div>
    </>
  );
}
