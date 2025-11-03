import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import type { Event } from "@shared/schema";
import { format } from "date-fns";
import { SEOHead } from "@/components/SEOHead";

export default function Events() {
  const { data: allEvents, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  // Intelligently categorize events
  const now = new Date();
  const upcomingEvents = allEvents?.filter(e => new Date(e.date) >= now).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  ) || [];
  const pastEvents = allEvents?.filter(e => new Date(e.date) < now).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ) || [];

  const UpcomingEventCard = ({ event }: { event: Event }) => (
    <Card className="hover-elevate overflow-hidden" data-testid={`card-event-${event.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="font-serif text-2xl mb-3" data-testid={`text-event-title-${event.id}`}>
              {event.title}
            </CardTitle>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-semibold text-primary" data-testid={`text-event-date-${event.id}`}>
                  {format(new Date(event.date), "EEEE, MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span data-testid={`text-event-location-${event.id}`}>
                  {event.city}
                </span>
              </div>
              {event.venue && (
                <p className="text-sm ml-6" data-testid={`text-event-venue-${event.id}`}>
                  {event.venue}
                </p>
              )}
            </div>
          </div>
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg text-center min-w-[90px]">
            <div className="text-3xl font-bold leading-none mb-1">
              {format(new Date(event.date), "d")}
            </div>
            <div className="text-xs uppercase font-semibold">
              {format(new Date(event.date), "MMM yyyy")}
            </div>
          </div>
        </div>
      </CardHeader>
      {event.link && (
        <CardFooter>
          <Button asChild className="w-full gap-2" data-testid={`button-event-link-${event.id}`}>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Event Details & RSVP
            </a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  const PastEventCard = ({ event }: { event: Event }) => (
    <Card className="hover-elevate" data-testid={`card-past-event-${event.id}`}>
      <CardHeader className="pb-4">
        <div className="text-xs text-muted-foreground mb-2 font-semibold" data-testid={`text-past-event-date-${event.id}`}>
          {format(new Date(event.date), "MMM yyyy")}
        </div>
        <CardTitle className="font-serif text-lg mb-2" data-testid={`text-past-event-title-${event.id}`}>
          {event.title}
        </CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span data-testid={`text-past-event-city-${event.id}`}>{event.city}</span>
        </div>
        {event.venue && (
          <p className="text-xs text-muted-foreground mt-1" data-testid={`text-past-event-venue-${event.id}`}>
            {event.venue}
          </p>
        )}
      </CardHeader>
    </Card>
  );

  return (
    <>
      <SEOHead
        title="Events & Performances | Poetically Fatimah"
        description="Join Fatimah for upcoming poetry performances, workshops, and readings. See where she'll be next and book her for your event."
        image="/og-events.jpg"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background via-accent/10 to-background">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6" data-testid="text-page-title">
              Where You Can Find Me
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Performances, workshops, and conversations across the country. Join me for an evening of powerful poetry and intimate storytelling.
            </p>
            <Button asChild size="lg" data-testid="button-book-event">
              <Link href="/contact">Book Me for Your Event</Link>
            </Button>
          </div>
        </section>

        <div className="container mx-auto px-6 max-w-5xl py-16">
          {/* Upcoming Events */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <h2 className="font-serif text-3xl font-bold" data-testid="text-section-upcoming">
                Upcoming Events
              </h2>
              <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
            </div>
            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-48" />
                ))}
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-6">
                {upcomingEvents.map((event) => (
                  <UpcomingEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Card className="py-16 text-center bg-accent/20">
                <CardContent>
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-2">
                    No upcoming events scheduled at this time.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Check back soon or subscribe to the newsletter for updates.
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/#newsletter">Subscribe to Newsletter</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Past Events */}
          <section>
            <h2 className="font-serif text-3xl font-bold mb-8 text-muted-foreground" data-testid="text-section-past">
              Past Performances
            </h2>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-32" />
                ))}
              </div>
            ) : pastEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {pastEvents.map((event) => (
                  <PastEventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Card className="py-12 text-center bg-muted/20">
                <CardContent>
                  <p className="text-muted-foreground">No past events to display.</p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
