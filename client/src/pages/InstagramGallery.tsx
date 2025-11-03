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
            <Card className="p-8 text-center">
              <Instagram className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-3">Live Instagram Feed</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                To display your Instagram posts here, you'll need to set up a widget using a service like 
                Elfsight, EmbedSocial, or Taggbox. These tools provide real-time syncing with your Instagram account.
              </p>
              
              <div className="bg-muted/50 p-6 rounded-lg max-w-2xl mx-auto mb-6">
                <p className="text-sm font-semibold mb-3">Setup Instructions:</p>
                <ol className="text-sm text-left space-y-2 text-muted-foreground">
                  <li>
                    <strong>Step 1:</strong> Choose a widget service:
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>• <a href="https://elfsight.com/instagram-feed-instashow/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Elfsight</a> (Free plan available)</li>
                      <li>• <a href="https://embedsocial.com/products/embedfeed/" target="_blank" rel="noopener noreferrer" className="text-primary underline">EmbedSocial</a> (Comprehensive features)</li>
                      <li>• <a href="https://taggbox.com/instagram-widget/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Taggbox</a> (Great for hashtags)</li>
                    </ul>
                  </li>
                  <li><strong>Step 2:</strong> Connect your Instagram Business account (@poeticallyfathmah)</li>
                  <li><strong>Step 3:</strong> Customize the feed layout (grid, carousel, or masonry)</li>
                  <li><strong>Step 4:</strong> Copy the generated embed code</li>
                  <li><strong>Step 5:</strong> Replace the placeholder in InstagramGallery.tsx with your code</li>
                </ol>
              </div>

              {/* Placeholder: Replace this comment with your Instagram widget embed code */}
              {/* Example for Elfsight:
              <div className="elfsight-app-[YOUR-APP-ID]"></div>
              <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
              */}

              {/* Example for EmbedSocial:
              <div className='embedsocial-hashtag' data-ref='[YOUR-REF-ID]'></div>
              <script>(function(d, s, id){var js; if (d.getElementById(id)) {return;} js = d.createElement(s); js.id = id; js.src = "https://embedsocial.com/cdn/ht.js"; d.getElementsByTagName("head")[0].appendChild(js);}(document, "script", "EmbedSocialHashtagScript"));</script>
              */}
            </Card>

            {/* Manual Grid Fallback - Can be populated with recent posts */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="aspect-square overflow-hidden hover-elevate cursor-pointer">
                  <div className="h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Instagram className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Instagram post {i}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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
