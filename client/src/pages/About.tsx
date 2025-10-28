import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-16" data-testid="text-page-title">
          About Fatimah
        </h1>

        {/* Artist Photo */}
        <div className="aspect-[4/3] bg-muted rounded-lg mb-16 overflow-hidden" data-testid="img-artist-photo">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Artist Portrait
          </div>
        </div>

        {/* Long Bio */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-xl leading-relaxed" data-testid="text-bio-long">
            Fatimah is a poet and performer whose work lives at the intersection of softness and strength. Her pieces explore healing, identity, and the quiet courage it takes to love out loud. On stage, she weaves breath, cadence, and silence into something that feels like a hand held. Off stage, she builds community—through workshops, intimate readings, and collaborations that center voice and vulnerability.
          </p>
          <p className="text-xl leading-relaxed mt-6">
            Her poetry has been featured at festivals, universities, and community spaces across the country. She believes in the power of words to heal, to challenge, and to connect us to what matters most. Whether through a spoken word performance, a workshop, or a quiet poem shared late at night, Fatimah's work invites you to feel deeply, think honestly, and remember that soft is not small—it's powerful.
          </p>
        </div>

        {/* Short Press Bio */}
        <div className="bg-accent/30 rounded-lg p-8 mb-16">
          <h2 className="font-serif text-2xl font-bold mb-4">Press Bio (Short)</h2>
          <p className="text-lg leading-relaxed" data-testid="text-bio-short">
            Fatimah is a poet and performer whose work explores healing, identity, and the intersection of softness and strength. Her pieces have been featured at festivals, universities, and community spaces nationwide. She is available for keynotes, spoken word sets, and creative workshops.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-16">
          <h2 className="font-serif text-3xl font-bold mb-6">Mission</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            To create spaces—on stage, on the page, and in community—where people can feel seen, heard, and held. To remind us all that vulnerability is not weakness, that healing is not linear, and that our stories matter.
          </p>
        </div>

        {/* Press Kit */}
        <div className="text-center bg-accent rounded-lg p-12">
          <h2 className="font-serif text-3xl font-bold mb-6">Press Kit</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            High-resolution photos, complete bio, technical rider, and performance highlights available for download.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2" data-testid="button-download-press-kit">
              <Download className="h-5 w-5" />
              Download Press Kit
            </Button>
            <Button size="lg" variant="secondary" asChild data-testid="button-contact">
              <Link href="/contact">
                <Mail className="h-5 w-5 mr-2" />
                Contact for Media
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
