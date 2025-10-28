import { useState } from "react";
import { Link } from "wouter";
import { Play, ArrowRight, Instagram, Youtube, Music, Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Poem, Testimonial, Product } from "@shared/schema";
import { AudioPlayer } from "@/components/AudioPlayer";
import { SEOHead } from "@/components/SEOHead";

const HERO_HEADLINES = [
  "Poetry that you don't just read — you feel.",
  "Soft power, spoken boldly.",
  "Letters that linger. A voice that stays.",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [headlineIndex] = useState(0);
  const { toast } = useToast();

  const { data: spotlightPoem, isLoading: poemLoading } = useQuery<Poem>({
    queryKey: ["/api/poems/spotlight"],
  });

  const { data: testimonials, isLoading: testimonialsLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"],
  });

  const newsletterMutation = useMutation({
    mutationFn: (email: string) => apiRequest("POST", "/api/newsletter", { email }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to the list. Check your inbox for a welcome note.",
      });
      setEmail("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Fatimah",
    alternateName: "Poetically Fatimah",
    description: "Poet and performer whose work explores healing, identity, and the intersection of softness and strength.",
    url: typeof window !== "undefined" ? window.location.origin : "",
    sameAs: [
      "https://instagram.com/poeticallyfatimah",
      "https://youtube.com/@poeticallyfatimah",
      "https://tiktok.com/@poeticallyfatimah"
    ],
    jobTitle: "Poet and Performer",
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Poetically Fatimah — Poetry, Performances & Prints"
        description="Poetry that heals, words that move rooms, and performances that stay with you. Explore poetry collections, book performances, and shop limited edition prints."
        schema={personSchema}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grain.png')] opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10 py-20">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in" data-testid="text-hero-headline">
            {HERO_HEADLINES[headlineIndex]}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-subhead">
            I'm Fatimah — writer, performer, and curator of moments that heal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gap-2" data-testid="button-listen-poem">
              <Play className="h-5 w-5" />
              Listen to a Poem
            </Button>
            <Button size="lg" variant="secondary" asChild data-testid="button-book-performance">
              <Link href="/contact">Book a Performance</Link>
            </Button>
          </div>
          <div className="flex gap-6 justify-center text-muted-foreground">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="YouTube">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="TikTok">
              <SiTiktok className="h-5 w-5" />
            </a>
            <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Spotify">
              <Music className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Spotlight Poem Section */}
      {!poemLoading && spotlightPoem && (
        <section className="py-24 bg-background" data-testid="section-spotlight-poem">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">Featured Poem</h2>
            
            {spotlightPoem.audioUrl && (
              <AudioPlayer
                audioUrl={spotlightPoem.audioUrl}
                title={spotlightPoem.title}
                transcript={spotlightPoem.transcript || undefined}
              />
            )}

            <div className="mt-12 prose prose-lg max-w-none text-center">
              <h3 className="font-serif text-3xl font-semibold mb-6" data-testid="text-poem-title">{spotlightPoem.title}</h3>
              <div className="whitespace-pre-wrap leading-relaxed text-foreground/90" data-testid="text-poem-excerpt">
                {spotlightPoem.excerpt || spotlightPoem.body.substring(0, 300)}
              </div>
            </div>

            <div className="text-center mt-8">
              <Link href={`/poetry/${spotlightPoem.slug}`}>
                <Button variant="ghost" className="gap-2" data-testid="link-read-full-poem">
                  Read the full piece
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Performance Reel Section */}
      <section className="py-24 bg-accent/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">On Stage</h2>
          
          <div className="aspect-video bg-card rounded-lg overflow-hidden mb-8" data-testid="video-performance-reel">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Performance Reel (Video Embed)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-cities">12+</div>
              <div className="text-muted-foreground">Cities</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-audiences">5000+</div>
              <div className="text-muted-foreground">Audience Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2" data-testid="text-stat-stages">30+</div>
              <div className="text-muted-foreground">Stages</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild data-testid="button-view-performances">
              <Link href="/performances">View Performances</Link>
            </Button>
            <Button variant="secondary" asChild data-testid="button-download-epk">
              <Link href="/performances#epk">Download EPK</Link>
            </Button>
            <Button variant="secondary" asChild data-testid="button-book-me">
              <Link href="/contact">Book Me</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Shop Items */}
      {!productsLoading && products && products.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-12">Latest Drops</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.slice(0, 3).map((product) => (
                <Card key={product.id} className="overflow-hidden hover-elevate" data-testid={`card-product-${product.id}`}>
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
                    <CardTitle className="font-serif text-2xl" data-testid={`text-product-title-${product.id}`}>{product.title}</CardTitle>
                    <p className="text-primary font-semibold" data-testid={`text-product-price-${product.id}`}>{product.priceText}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2" data-testid={`text-product-blurb-${product.id}`}>{product.blurb}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" data-testid={`button-view-product-${product.id}`}>
                      <a href={product.buyUrl} target="_blank" rel="noopener noreferrer">View Details</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" asChild data-testid="button-shop-all">
                <Link href="/shop">Shop All</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-24 bg-accent" data-testid="section-newsletter">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">Get first reads, show dates & quiet notes</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join my quiet corner of the internet. First reads, new dates, and words I only send here.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              data-testid="input-newsletter-email"
            />
            <Button type="submit" disabled={newsletterMutation.isPending} className="gap-2" data-testid="button-newsletter-submit">
              <Mail className="h-4 w-4" />
              {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>

      {/* Testimonials Section */}
      {!testimonialsLoading && testimonials && testimonials.length > 0 && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">Kind Words</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((testimonial) => (
                <Card key={testimonial.id} className="p-8" data-testid={`card-testimonial-${testimonial.id}`}>
                  <div className="text-6xl text-primary mb-4 font-serif">"</div>
                  <p className="text-lg leading-relaxed mb-6 italic" data-testid={`text-testimonial-quote-${testimonial.id}`}>
                    {testimonial.quote}
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-semibold" data-testid={`text-testimonial-name-${testimonial.id}`}>{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-sm text-muted-foreground" data-testid={`text-testimonial-role-${testimonial.id}`}>{testimonial.role}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
