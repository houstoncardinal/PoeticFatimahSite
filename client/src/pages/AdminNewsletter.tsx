import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail } from "lucide-react";
import type { NewsletterSubscription } from "@shared/schema";
import { format } from "date-fns";

export default function AdminNewsletter() {
  const [, setLocation] = useLocation();

  const { data: user, isLoading: authLoading } = useQuery({ queryKey: ["/api/auth/me"], retry: false });
  const { data: subscribers, isLoading } = useQuery<NewsletterSubscription[]>({ 
    queryKey: ["/api/newsletter/subscribers"] 
  });

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!user) {
    setLocation("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setLocation("/admin")} data-testid="button-back">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-serif font-bold">Newsletter Subscribers</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              All Subscribers ({subscribers?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground">Loading subscribers...</p>
            ) : subscribers && subscribers.length > 0 ? (
              <div className="space-y-2">
                {subscribers.map((subscriber) => (
                  <div
                    key={subscriber.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover-elevate"
                    data-testid={`subscriber-${subscriber.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm">{subscriber.email}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Subscribed {format(new Date(subscriber.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No subscribers yet. Newsletter signups will appear here.</p>
            )}
          </CardContent>
        </Card>

        {subscribers && subscribers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Export Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Copy subscriber emails to use with your email marketing platform (Mailchimp, ConvertKit, etc.)
              </p>
              <Button
                onClick={() => {
                  const emails = subscribers.map(s => s.email).join(", ");
                  navigator.clipboard.writeText(emails);
                  alert("Emails copied to clipboard!");
                }}
                data-testid="button-copy-emails"
              >
                Copy All Emails
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
