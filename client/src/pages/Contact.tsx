import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CONTACT_TYPES = [
  {
    title: "General Inquiries",
    description: "Questions, comments, or just want to say hello",
    email: "hello@poeticallyfatimah.com",
  },
  {
    title: "Press & Media",
    description: "Interview requests, features, and media appearances",
    email: "press@poeticallyfatimah.com",
  },
  {
    title: "Booking & Performances",
    description: "Keynotes, spoken word sets, workshops, and events",
    email: "booking@poeticallyfatimah.com",
  },
  {
    title: "Workshops & Education",
    description: "School visits, university residencies, and educational programs",
    email: "workshops@poeticallyfatimah.com",
  },
  {
    title: "Brand Collaborations",
    description: "Partnership opportunities and creative projects",
    email: "collaborate@poeticallyfatimah.com",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="font-serif text-5xl md:text-6xl font-bold text-center mb-6" data-testid="text-page-title">
          Get in Touch
        </h1>
        <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
          I'd love to hear from you. Whether you're looking to book a performance, collaborate on a project, or just want to connect—reach out.
        </p>

        {/* Booking Form Info */}
        <div className="bg-accent/30 rounded-lg p-8 md:p-12 mb-16 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Booking Request</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            For booking inquiries, please include: event name, date, location, expected audience size, and budget range.
          </p>
          <div className="bg-background/50 rounded-lg p-8">
            <p className="text-muted-foreground mb-4">Booking form integration placeholder</p>
            <p className="text-sm text-muted-foreground">
              (Tally/Typeform embed would go here in production)
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONTACT_TYPES.map((contact) => (
            <Card key={contact.title} className="hover-elevate" data-testid={`card-contact-${contact.title.toLowerCase().replace(/\s+/g, '-')}`}>
              <CardHeader>
                <CardTitle className="font-serif text-2xl flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  {contact.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{contact.description}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary hover:underline font-medium"
                  data-testid={`link-email-${contact.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {contact.email}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Response Time Note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            I typically respond within 2-3 business days. For urgent booking requests, please note that in your subject line.
          </p>
        </div>
      </div>
    </div>
  );
}
