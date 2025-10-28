import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import type { Event } from "@shared/schema";
import { format } from "date-fns";

export default function Events() {
  const { data: upcomingEvents, isLoading: upcomingLoading } = useQuery<Event[]>({
    queryKey: ["/api/events/upcoming"],
  });

  const { data: pastEvents, isLoading: pastLoading } = useQuery<Event[]>({
    queryKey: ["/api/events/past"],
  });

  const EventCard = ({ event }: { event: Event }) => (
    <Card className={event.isPast ? "opacity-60" : ""} data-testid={`card-event-${event.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="font-serif text-2xl mb-2" data-testid={`text-event-title-${event.id}`}>
              {event.title}
            </CardTitle>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span data-testid={`text-event-date-${event.id}`}>
                  {format(new Date(event.date), "MMMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span data-testid={`text-event-location-${event.id}`}>
                  {event.city}
                  {event.venue && ` - ${event.venue}`}
                </span>
              </div>
            </div>
          </div>
          {!event.isPast && (
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-center min-w-[80px]">
              <div className="text-2xl font-bold">
                {format(new Date(event.date), "d")}
              </div>
              <div className="text-xs uppercase">
                {format(new Date(event.date), "MMM")}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      {event.link && !event.isPast && (
        <CardContent>
          <Button asChild variant="outline" className="gap-2" data-testid={`button-event-link-${event.id}`}>
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              RSVP / Details
            </a>
          </Button>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-6" data-testid="text-page-title">
          Events & Dates
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Join me for upcoming performances, readings, and workshops. See where I'll be next.
        </p>

        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="font-serif text-3xl font-bold mb-8" data-testid="text-section-upcoming">
            Upcoming Events
          </h2>
          {upcomingLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {upcomingEvents && upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="text-center py-12 bg-accent/30 rounded-lg">
                  <p className="text-muted-foreground text-lg">
                    No upcoming events scheduled at this time.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Check back soon or subscribe to the newsletter for updates.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Past Events */}
        <section>
          <h2 className="font-serif text-3xl font-bold mb-8" data-testid="text-section-past">
            Past Events
          </h2>
          {pastLoading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {pastEvents && pastEvents.length > 0 ? (
                pastEvents.slice(0, 5).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">No past events to display.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
