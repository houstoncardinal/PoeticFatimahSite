import { Link } from "wouter";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TOPICS = [
  "Healing",
  "Identity",
  "Love",
  "Womanhood",
  "Faith",
  "Resilience",
];

const HIGHLIGHTS = [
  "TEDx Conference",
  "National Poetry Month Festival",
  "University Lecture Series",
  "Women's Empowerment Summit",
  "Literary Arts Festival",
  "Community Arts Center",
];

export default function Performances() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-6" data-testid="text-page-title">
          Performances & Speaking
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          Spoken word artist blending intimacy and impact. Available for keynotes, sets, and workshops.
        </p>

        {/* Performance Reel */}
        <div className="mb-24">
          <div className="aspect-video bg-card rounded-lg overflow-hidden mb-8" data-testid="video-performance-reel">
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              Performance Reel (Video Embed)
            </div>
          </div>
        </div>

        {/* What I Do */}
        <section className="mb-24">
          <h2 className="font-serif text-4xl font-bold mb-8" data-testid="text-section-what-i-do">What I Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Keynote Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  45-60 minute keynote presentations weaving poetry, personal narrative, and audience engagement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spoken Word Sets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  5-20 minute performance sets for festivals, events, and special occasions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Interactive writing workshops focused on healing, voice, and creative expression.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Topics & Themes */}
        <section className="mb-24">
          <h2 className="font-serif text-4xl font-bold mb-8" data-testid="text-section-topics">Topics & Themes</h2>
          <div className="flex flex-wrap gap-3">
            {TOPICS.map((topic) => (
              <Badge key={topic} variant="secondary" className="text-base px-4 py-2" data-testid={`badge-topic-${topic.toLowerCase()}`}>
                {topic}
              </Badge>
            ))}
          </div>
        </section>

        {/* Stage Tech Needs */}
        <section className="mb-24">
          <h2 className="font-serif text-4xl font-bold mb-8" data-testid="text-section-tech">Stage Tech Requirements</h2>
          <Card className="p-8">
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>1 wireless handheld microphone</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Audio playback capability (3.5mm or Bluetooth)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Optional: Stool or chair for seated performances</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Water on stage</span>
              </li>
            </ul>
          </Card>
        </section>

        {/* Highlights */}
        <section className="mb-24">
          <h2 className="font-serif text-4xl font-bold mb-8" data-testid="text-section-highlights">Past Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {HIGHLIGHTS.map((highlight) => (
              <div
                key={highlight}
                className="p-6 bg-accent/50 rounded-md text-center font-medium"
                data-testid={`text-highlight-${highlight.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {highlight}
              </div>
            ))}
          </div>
        </section>

        {/* EPK Download & Booking */}
        <section id="epk" className="text-center">
          <div className="bg-accent/30 rounded-lg p-12">
            <h2 className="font-serif text-4xl font-bold mb-6">Electronic Press Kit</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Download my complete press kit including bio, photos, technical requirements, and past performance highlights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" data-testid="button-download-epk">
                <Download className="h-5 w-5" />
                Download EPK (PDF)
              </Button>
              <Button size="lg" variant="secondary" asChild data-testid="button-book-performance">
                <Link href="/contact">Invite Fatimah to Your Stage</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
