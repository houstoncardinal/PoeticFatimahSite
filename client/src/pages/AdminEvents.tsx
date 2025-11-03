import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import type { Event } from "@shared/schema";
import { format } from "date-fns";

export default function AdminEvents() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    city: "",
    venue: "",
    link: "",
  });

  const { data: user, isLoading: authLoading } = useQuery({ queryKey: ["/api/auth/me"], retry: false });
  const { data: events, isLoading } = useQuery<Event[]>({ queryKey: ["/api/events"] });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = {
        ...data,
        date: new Date(data.date).toISOString(),
      };
      return apiRequest("POST", "/api/events", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error creating event", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const payload = {
        ...data,
        date: new Date(data.date).toISOString(),
      };
      return apiRequest("PUT", `/api/events/${id}`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event updated successfully" });
      setIsDialogOpen(false);
      setEditingEvent(null);
      resetForm();
    },
    onError: () => {
      toast({ title: "Error updating event", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/events/${id}`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Event deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error deleting event", variant: "destructive" });
    },
  });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      city: "",
      venue: "",
      link: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateMutation.mutate({ id: editingEvent.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    const eventDate = new Date(event.date);
    const localDatetime = new Date(eventDate.getTime() - eventDate.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setFormData({
      title: event.title,
      date: localDatetime,
      city: event.city,
      venue: event.venue || "",
      link: event.link || "",
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setLocation("/admin")} data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-serif font-bold">Manage Events</h1>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingEvent(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-event">
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
                <DialogDescription>
                  {editingEvent ? "Update event details" : "Add a performance, workshop, or speaking engagement"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    data-testid="input-title"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date & Time *</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    data-testid="input-date"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    placeholder="Brooklyn, NY"
                    data-testid="input-city"
                  />
                </div>
                <div>
                  <Label htmlFor="venue">Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="The Loft Literary Center"
                    data-testid="input-venue"
                  />
                </div>
                <div>
                  <Label htmlFor="link">Ticket/Info Link</Label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    data-testid="input-link"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending} 
                    data-testid="button-submit"
                  >
                    {editingEvent 
                      ? (updateMutation.isPending ? "Updating..." : "Update Event")
                      : (createMutation.isPending ? "Creating..." : "Create Event")
                    }
                  </Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setIsDialogOpen(false);
                    setEditingEvent(null);
                    resetForm();
                  }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Events ({events?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading events...</p>
            ) : events && events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start justify-between p-4 border rounded-lg hover-elevate"
                    data-testid={`event-${event.id}`}
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(new Date(event.date), "MMMM d, yyyy 'at' h:mm a")}
                      </p>
                      <p className="text-sm mt-1">{event.city}</p>
                      {event.venue && <p className="text-sm text-muted-foreground">{event.venue}</p>}
                      {event.link && (
                        <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          Event Link →
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(event)}
                        data-testid={`button-edit-${event.id}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (confirm(`Delete "${event.title}"?`)) {
                            deleteMutation.mutate(event.id);
                          }
                        }}
                        data-testid={`button-delete-${event.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No events yet. Create your first event!</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
