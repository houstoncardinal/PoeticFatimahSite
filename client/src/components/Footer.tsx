import { Link } from "wouter";
import { Instagram, Youtube, Music } from "lucide-react";
import { SiTiktok } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t bg-accent/30 mt-32">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl font-bold mb-4">Poetically Fatimah</h3>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Poetry that heals, words that move rooms, and performances that stay with you.
            </p>
            
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
                data-testid="link-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
                data-testid="link-tiktok"
              >
                <SiTiktok className="h-5 w-5" />
              </a>
              <a
                href="https://spotify.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Spotify"
                data-testid="link-spotify"
              >
                <Music className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/poetry" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-poetry">Poetry</Link></li>
              <li><Link href="/performances" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-performances">Performances</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-shop">Shop</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-events">Events</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">About</Link></li>
              <li><Link href="/journal" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-journal">Journal</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Contact</Link></li>
              <li><Link href="/links" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-links">Links</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Poetically Fatimah. Made with love and late-night lines.
          </p>
        </div>
      </div>
    </footer>
  );
}
