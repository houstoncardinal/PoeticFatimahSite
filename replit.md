# Poetically Fatimah - Personal Brand Website

## Overview

A high-end personal brand website for poet and performer Fatimah, showcasing poetry collections, performances, events, products, and journal posts. The site features a premium editorial design inspired by literary magazines, with audio poetry playback, newsletter subscriptions, and booking capabilities. Built as a full-stack application with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (November 2025)

**Intelligent Events System (Latest):**
- Removed testimonials section from homepage
- Added powerful events section with smart date-based categorization
- Events automatically categorized as "Upcoming" (future dates) or "Past Performances" (past dates)
- Homepage displays up to 4 upcoming events and 6 past events
- Redesigned Events page (/events) with hero section and improved UX
- Client-side filtering and sorting ensures real-time accuracy
- Pulsing indicator on upcoming events for visual emphasis
- All event management via /admin/events interface

**Database Migration (October 2025):**
- Migrated from in-memory storage to PostgreSQL with Neon serverless
- All content now persists across server restarts
- Implemented DbStorage class using Drizzle ORM

**Admin Authentication:**
- Passport.js local strategy for secure admin login
- Session-based authentication with express-session
- Default admin credentials: username=admin, password=admin123
- Protected admin routes with requireAuth middleware

**Complete Admin Dashboard:**
- Admin portal at /admin with authentication required
- 6 Full CRUD Management Interfaces:
  - **/admin/poems** - Create, view, delete poems with themes and audio
  - **/admin/collections** - Organize poems into collections
  - **/admin/events** - Manage performances and speaking engagements
  - **/admin/products** - Shop management (books, prints, digital products)
  - **/admin/journal** - Blog posts and announcements
  - **/admin/newsletter** - View email subscribers with export function
- All forms use dialog modals with validation
- Automatic slug generation for URLs
- Success/error toasts for all operations
- Logout functionality on all pages

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Client-side routing using Wouter (lightweight alternative to React Router)
- Single Page Application (SPA) architecture

**UI Component System**
- Shadcn UI component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Typography: Playfair Display (serif/display) and Inter (sans-serif/body)
- Color palette: Obsidian Black, Porcelain White, Rose Gold, Deep Plum, Soft Sand
- Component organization: `/client/src/components/ui` for reusable components

**State Management**
- TanStack Query (React Query) for server state management and caching
- Local component state with React hooks
- Theme management with custom ThemeProvider (light/dark mode)

**Key Pages**
- Home: Hero section, spotlight poem, intelligent events section (upcoming/past), Instagram feed, newsletter signup
- Poetry: Collections grid and individual poem views with audio player
- Performances: Video reel, topics, booking information
- Shop: Product catalog with featured items
- Events: Hero section with "Where You Can Find Me" messaging, upcoming events with date badges, past performances grid
- Journal: Blog-style posts with categories
- About: Biography, mission, press kit
- Contact: Multi-purpose contact forms for different inquiries
- Links: Bio link page for social media

### Backend Architecture

**Server Framework**
- Express.js with TypeScript
- ESM module system
- Development: tsx for TypeScript execution
- Production: Compiled with esbuild

**API Design**
- RESTful API endpoints under `/api` prefix
- JSON request/response format
- Route organization in `server/routes.ts`
- Middleware for request logging with timing

**Data Layer**
- Drizzle ORM for database abstraction
- PostgreSQL as the primary database (via Neon serverless)
- Schema definitions in `shared/schema.ts` for type sharing
- In-memory storage implementation with interface pattern for easy swapping

**Database Schema**
- Collections: Poetry collection groupings
- Poems: Individual poems with audio, transcripts, themes
- Events: Performances with date, city, venue, link (smart client-side categorization into upcoming/past)
- Products: Shop items with pricing and inventory
- Journal Posts: Blog-style content with categories
- Newsletter Subscriptions: Email capture for mailing list
- Admin Users: Authentication credentials with bcrypt password hashing

**Storage Pattern**
- IStorage interface defines all data operations
- DbStorage implementation using Drizzle ORM with PostgreSQL
- All data persists in Neon serverless PostgreSQL database
- Seed script available at server/seed.ts
- All schema types are Zod-validated for runtime safety

### External Dependencies

**Cloud Services**
- Google Cloud Storage via `@google-cloud/storage` for media assets (images, audio files)
- Replit Object Storage for public asset serving
- Custom ObjectStorageService handles file retrieval and streaming

**File Upload**
- Uppy file uploader with AWS S3 compatibility
- Dashboard UI for media management
- Integration prepared but not actively used in current routes

**Third-Party UI Libraries**
- Radix UI: Accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- Lucide React: Icon system
- React Icons: Additional icon sets (TikTok, etc.)
- date-fns: Date formatting and manipulation
- cmdk: Command palette component
- Vaul: Drawer component

**Development Tools**
- Drizzle Kit: Database migrations and schema management
- Replit-specific plugins: Runtime error overlay, cartographer, dev banner
- TypeScript for type checking across the stack

**Content Delivery**
- Audio playback via HTML5 audio with custom AudioPlayer component
- Video embeds (placeholder for performance reels)
- Image optimization through cloud storage

**SEO & Analytics**
- Custom SEOHead component for meta tags
- Open Graph and Twitter Card support
- JSON-LD schema preparation (structured data)