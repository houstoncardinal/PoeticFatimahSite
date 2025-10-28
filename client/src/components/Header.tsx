import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Poetry", href: "/poetry" },
  { name: "Performances", href: "/performances" },
  { name: "Shop", href: "/shop" },
  { name: "Events", href: "/events" },
  { name: "Journal", href: "/journal" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <span className="font-serif text-2xl font-bold tracking-tight">
              Poetically Fatimah
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 h-9 px-4 py-2 ${
                  location === item.href ? "bg-accent text-accent-foreground" : ""
                }`}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-menu">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col gap-4 mt-8">
                  <span className="font-serif text-xl font-bold mb-4">
                    Poetically Fatimah
                  </span>
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`inline-flex items-center justify-start whitespace-nowrap rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 h-9 px-4 py-2 w-full ${
                        location === item.href ? "bg-accent text-accent-foreground" : ""
                      }`}
                      onClick={() => setOpen(false)}
                      data-testid={`link-mobile-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
