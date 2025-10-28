import { Link } from "wouter";
import { Headphones, Mic, ShoppingBag, Mail, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LINKS = [
  {
    title: "New Poem 🎧",
    description: "Listen to my latest piece",
    href: "/poetry",
    icon: Headphones,
  },
  {
    title: "Book Me 🎤",
    description: "Invite me to your stage",
    href: "/contact",
    icon: Mic,
  },
  {
    title: "Shop Prints 🛍️",
    description: "Limited edition poetry prints",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    title: "Join the List ✉️",
    description: "First reads & show dates",
    href: "/#newsletter",
    icon: Mail,
  },
  {
    title: "Events 📅",
    description: "See where I'll be next",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Full Site ⟶",
    description: "Explore everything",
    href: "/",
    icon: ExternalLink,
  },
];

export default function Links() {
  return (
    <div className="min-h-screen py-24 bg-gradient-to-br from-background via-accent/10 to-background">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-page-title">
            Poetically Fatimah
          </h1>
          <p className="text-lg text-muted-foreground">
            Poetry that heals, words that move rooms
          </p>
        </div>

        <div className="space-y-4">
          {LINKS.map((link, index) => (
            <Link key={index} href={link.href}>
              <Card className="p-6 hover-elevate active-elevate-2 cursor-pointer" data-testid={`card-link-${index}`}>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1" data-testid={`text-link-title-${index}`}>
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid={`text-link-description-${index}`}>
                      {link.description}
                    </p>
                  </div>
                  <ExternalLink className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Made with love and late-night lines
          </p>
        </div>
      </div>
    </div>
  );
}
