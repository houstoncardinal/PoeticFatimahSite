import {
  type Collection, type InsertCollection,
  type Poem, type InsertPoem,
  type Event, type InsertEvent,
  type Testimonial, type InsertTestimonial,
  type Product, type InsertProduct,
  type JournalPost, type InsertJournalPost,
  type NewsletterSubscription, type InsertNewsletterSubscription,
  collections, poems, events, testimonials, products, journalPosts, newsletterSubscriptions,
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq, desc, lt, gte, sql as drizzleSql } from "drizzle-orm";

export interface IStorage {
  // Collections
  getAllCollections(): Promise<Collection[]>;
  getCollectionBySlug(slug: string): Promise<Collection | undefined>;
  createCollection(collection: InsertCollection): Promise<Collection>;
  updateCollection(id: string, collection: Partial<InsertCollection>): Promise<Collection>;
  deleteCollection(id: string): Promise<void>;

  // Poems
  getAllPoems(): Promise<Poem[]>;
  getPoemsByCollectionId(collectionId: string): Promise<Poem[]>;
  getPoemBySlug(slug: string): Promise<Poem | undefined>;
  getSpotlightPoem(): Promise<Poem | undefined>;
  createPoem(poem: InsertPoem): Promise<Poem>;
  updatePoem(id: string, poem: Partial<InsertPoem>): Promise<Poem>;
  deletePoem(id: string): Promise<void>;

  // Events
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  getPastEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;

  // Products
  getAllProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;

  // Journal Posts
  getAllJournalPosts(): Promise<JournalPost[]>;
  getJournalPostBySlug(slug: string): Promise<JournalPost | undefined>;
  getJournalPostsByCategory(category: string): Promise<JournalPost[]>;
  createJournalPost(post: InsertJournalPost): Promise<JournalPost>;
  updateJournalPost(id: string, post: Partial<InsertJournalPost>): Promise<JournalPost>;
  deleteJournalPost(id: string): Promise<void>;

  // Newsletter
  subscribeToNewsletter(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
}

export class MemStorage implements IStorage {
  private collections: Map<string, Collection>;
  private poems: Map<string, Poem>;
  private events: Map<string, Event>;
  private testimonials: Map<string, Testimonial>;
  private products: Map<string, Product>;
  private journalPosts: Map<string, JournalPost>;
  private newsletterSubs: Map<string, NewsletterSubscription>;

  constructor() {
    this.collections = new Map();
    this.poems = new Map();
    this.events = new Map();
    this.testimonials = new Map();
    this.products = new Map();
    this.journalPosts = new Map();
    this.newsletterSubs = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed Collections
    const healingCollection: Collection = {
      id: randomUUID(),
      title: "Healing",
      slug: "healing",
      description: "Poems that explore the journey of healing, self-discovery, and gentle transformation.",
      createdAt: new Date("2024-01-15"),
    };
    this.collections.set(healingCollection.id, healingCollection);

    const becomingCollection: Collection = {
      id: randomUUID(),
      title: "Becoming",
      slug: "becoming",
      description: "Reflections on identity, growth, and the courage to evolve into who you're meant to be.",
      createdAt: new Date("2024-02-01"),
    };
    this.collections.set(becomingCollection.id, becomingCollection);

    const cityLightCollection: Collection = {
      id: randomUUID(),
      title: "City Light",
      slug: "city-light",
      description: "Urban poetry capturing the pulse of the city, its people, and fleeting moments of connection.",
      createdAt: new Date("2024-03-10"),
    };
    this.collections.set(cityLightCollection.id, cityLightCollection);

    // Seed Poems
    const poem1: Poem = {
      id: randomUUID(),
      title: "Soft is Not Small",
      slug: "soft-is-not-small",
      body: `They tell you softness is weakness,
that gentle hearts break too easily.
But I've seen mountains carved by rain,
rivers that shape stone with patience.

Soft is not small.
Soft is choosing kindness when the world is hard.
Soft is holding space for your own healing.
Soft is the power to feel everything
and still choose love.`,
      excerpt: "They tell you softness is weakness, that gentle hearts break too easily. But I've seen mountains carved by rain...",
      audioUrl: null,
      transcript: null,
      collectionId: healingCollection.id,
      themes: ["Healing", "Strength", "Vulnerability"],
      imageUrl: null,
      createdAt: new Date("2024-01-20"),
    };
    this.poems.set(poem1.id, poem1);

    const poem2: Poem = {
      id: randomUUID(),
      title: "Letters to Myself",
      slug: "letters-to-myself",
      body: `Dear younger me,
I know you're afraid of taking up space.
Afraid your voice is too loud,
or maybe not loud enough.

But one day you'll learn
that your existence is not an apology.
That you deserve to bloom
without asking for permission.`,
      excerpt: "Dear younger me, I know you're afraid of taking up space. Afraid your voice is too loud...",
      audioUrl: null,
      transcript: null,
      collectionId: becomingCollection.id,
      themes: ["Identity", "Self-Love", "Growth"],
      imageUrl: null,
      createdAt: new Date("2024-02-05"),
    };
    this.poems.set(poem2.id, poem2);

    const poem3: Poem = {
      id: randomUUID(),
      title: "Evening Train",
      slug: "evening-train",
      body: `On the evening train,
we are all strangers
sharing the same silence.

A woman reads a book she'll never finish.
A man stares at his reflection in the window.
A child counts the stops on her fingers.

For a moment, we are connected
by this metal vessel moving through the dark,
all of us going somewhere,
all of us leaving something behind.`,
      excerpt: "On the evening train, we are all strangers sharing the same silence...",
      audioUrl: null,
      transcript: null,
      collectionId: cityLightCollection.id,
      themes: ["Connection", "Urban Life", "Solitude"],
      imageUrl: null,
      createdAt: new Date("2024-03-15"),
    };
    this.poems.set(poem3.id, poem3);

    // Seed Testimonials
    const testimonial1: Testimonial = {
      id: randomUUID(),
      quote: "Fatimah's words stayed with me long after the performance. She has a gift for making you feel seen.",
      name: "Sarah Chen",
      role: "Event Organizer, Women's Leadership Summit",
      source: null,
      createdAt: new Date("2024-04-01"),
    };
    this.testimonials.set(testimonial1.id, testimonial1);

    const testimonial2: Testimonial = {
      id: randomUUID(),
      quote: "Her poetry workshop transformed how our students think about vulnerability and strength. Truly impactful.",
      name: "Dr. Marcus Thompson",
      role: "Dean of Arts, University of Portland",
      source: null,
      createdAt: new Date("2024-04-15"),
    };
    this.testimonials.set(testimonial2.id, testimonial2);

    // Seed Products
    const product1: Product = {
      id: randomUUID(),
      title: "Letters That Linger",
      blurb: "A collection of intimate poems exploring love, loss, and the quiet moments in between.",
      priceText: "$18.00",
      buyUrl: "#",
      imageUrl: null,
      details: "Softcover, 64 pages. Signed edition available.",
      createdAt: new Date("2024-03-01"),
    };
    this.products.set(product1.id, product1);

    const product2: Product = {
      id: randomUUID(),
      title: '"Soft Power" Print',
      blurb: "Limited edition 10×14 archival print of the poem that won't leave you.",
      priceText: "$35.00",
      buyUrl: "#",
      imageUrl: null,
      details: "Edition of 100, signed and numbered.",
      createdAt: new Date("2024-03-15"),
    };
    this.products.set(product2.id, product2);

    const product3: Product = {
      id: randomUUID(),
      title: "Poetry Bundle",
      blurb: "Complete collection: book + audio recordings + exclusive commentary.",
      priceText: "$45.00",
      buyUrl: "#",
      imageUrl: null,
      details: "Digital download includes PDF and MP3 files.",
      createdAt: new Date("2024-04-01"),
    };
    this.products.set(product3.id, product3);

    // Seed Events
    const upcomingEvent: Event = {
      id: randomUUID(),
      title: "Poetry & Performance Evening",
      date: new Date("2025-11-15T19:00:00"),
      city: "Portland",
      venue: "The Arts Center",
      link: "#",
      isPast: false,
      createdAt: new Date("2024-10-01"),
    };
    this.events.set(upcomingEvent.id, upcomingEvent);

    const pastEvent: Event = {
      id: randomUUID(),
      title: "Women's Voices Festival",
      date: new Date("2024-09-20T18:00:00"),
      city: "Seattle",
      venue: "Literary Arts Building",
      link: null,
      isPast: true,
      createdAt: new Date("2024-08-01"),
    };
    this.events.set(pastEvent.id, pastEvent);

    // Seed Journal Posts
    const journalPost1: JournalPost = {
      id: randomUUID(),
      title: "On Writing Through Uncertainty",
      slug: "writing-through-uncertainty",
      body: `There are days when the page feels like an old friend, and days when it feels like a stranger. Today was the latter.

I sat with my notebook for an hour, pen in hand, waiting for something to come. Nothing did. Or at least, nothing that felt worthy of keeping.

But here's what I'm learning: the practice of showing up matters more than the product. The days when writing feels impossible are often the days we need it most.

So I write anyway. I write about not knowing what to write. I write about the resistance, the doubt, the fear that maybe I've said all I have to say.

And then, somewhere in the middle of that honesty, a line appears. A real one. A keeper.

The muse doesn't reward those who wait for inspiration. She rewards those who show up anyway.`,
      excerpt: "There are days when the page feels like an old friend, and days when it feels like a stranger...",
      category: "On craft",
      audioUrl: null,
      imageUrl: null,
      createdAt: new Date("2024-10-05"),
    };
    this.journalPosts.set(journalPost1.id, journalPost1);
  }

  // Collections
  async getAllCollections(): Promise<Collection[]> {
    return Array.from(this.collections.values()).sort((a, b) => 
      a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    return Array.from(this.collections.values()).find(c => c.slug === slug);
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const id = randomUUID();
    const collection: Collection = { ...insertCollection, id, createdAt: new Date() };
    this.collections.set(id, collection);
    return collection;
  }

  // Poems
  async getAllPoems(): Promise<Poem[]> {
    return Array.from(this.poems.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPoemsByCollectionId(collectionId: string): Promise<Poem[]> {
    return Array.from(this.poems.values())
      .filter(p => p.collectionId === collectionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPoemBySlug(slug: string): Promise<Poem | undefined> {
    return Array.from(this.poems.values()).find(p => p.slug === slug);
  }

  async getSpotlightPoem(): Promise<Poem | undefined> {
    const poems = Array.from(this.poems.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
    return poems[0];
  }

  async createPoem(insertPoem: InsertPoem): Promise<Poem> {
    const id = randomUUID();
    const poem: Poem = { ...insertPoem, id, createdAt: new Date() };
    this.poems.set(id, poem);
    return poem;
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort((a, b) => 
      a.date.getTime() - b.date.getTime()
    );
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values())
      .filter(e => !e.isPast && e.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async getPastEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .filter(e => e.isPast)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { ...insertEvent, id, createdAt: new Date() };
    this.events.set(id, event);
    return event;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const testimonial: Testimonial = { ...insertTestimonial, id, createdAt: new Date() };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return (await this.getAllProducts()).slice(0, 3);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id, createdAt: new Date() };
    this.products.set(id, product);
    return product;
  }

  // Journal Posts
  async getAllJournalPosts(): Promise<JournalPost[]> {
    return Array.from(this.journalPosts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getJournalPostBySlug(slug: string): Promise<JournalPost | undefined> {
    return Array.from(this.journalPosts.values()).find(p => p.slug === slug);
  }

  async getJournalPostsByCategory(category: string): Promise<JournalPost[]> {
    return Array.from(this.journalPosts.values())
      .filter(p => p.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createJournalPost(insertPost: InsertJournalPost): Promise<JournalPost> {
    const id = randomUUID();
    const post: JournalPost = { ...insertPost, id, createdAt: new Date() };
    this.journalPosts.set(id, post);
    return post;
  }

  // Newsletter
  async subscribeToNewsletter(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const existing = Array.from(this.newsletterSubs.values()).find(
      s => s.email === insertSubscription.email
    );
    if (existing) {
      throw new Error("Email already subscribed");
    }

    const id = randomUUID();
    const subscription: NewsletterSubscription = { ...insertSubscription, id, createdAt: new Date() };
    this.newsletterSubs.set(id, subscription);
    return subscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubs.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export class DbStorage implements IStorage {
  // Collections
  async getAllCollections(): Promise<Collection[]> {
    return db.select().from(collections).orderBy(desc(collections.createdAt));
  }

  async getCollectionBySlug(slug: string): Promise<Collection | undefined> {
    const result = await db.select().from(collections).where(eq(collections.slug, slug)).limit(1);
    return result[0];
  }

  async createCollection(insertCollection: InsertCollection): Promise<Collection> {
    const result = await db.insert(collections).values(insertCollection).returning();
    return result[0];
  }

  async updateCollection(id: string, updateData: Partial<InsertCollection>): Promise<Collection> {
    const result = await db.update(collections).set(updateData).where(eq(collections.id, id)).returning();
    return result[0];
  }

  async deleteCollection(id: string): Promise<void> {
    await db.delete(collections).where(eq(collections.id, id));
  }

  // Poems
  async getAllPoems(): Promise<Poem[]> {
    return db.select().from(poems).orderBy(desc(poems.createdAt));
  }

  async getPoemsByCollectionId(collectionId: string): Promise<Poem[]> {
    return db.select().from(poems).where(eq(poems.collectionId, collectionId)).orderBy(desc(poems.createdAt));
  }

  async getPoemBySlug(slug: string): Promise<Poem | undefined> {
    const result = await db.select().from(poems).where(eq(poems.slug, slug)).limit(1);
    return result[0];
  }

  async getSpotlightPoem(): Promise<Poem | undefined> {
    const result = await db.select().from(poems).orderBy(desc(poems.createdAt)).limit(1);
    return result[0];
  }

  async createPoem(insertPoem: InsertPoem): Promise<Poem> {
    const result = await db.insert(poems).values(insertPoem).returning();
    return result[0];
  }

  async updatePoem(id: string, updateData: Partial<InsertPoem>): Promise<Poem> {
    const result = await db.update(poems).set(updateData).where(eq(poems.id, id)).returning();
    return result[0];
  }

  async deletePoem(id: string): Promise<void> {
    await db.delete(poems).where(eq(poems.id, id));
  }

  // Events
  async getAllEvents(): Promise<Event[]> {
    return db.select().from(events).orderBy(events.date);
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return db.select().from(events).where(gte(events.date, now)).orderBy(events.date);
  }

  async getPastEvents(): Promise<Event[]> {
    const now = new Date();
    return db.select().from(events).where(lt(events.date, now)).orderBy(desc(events.date));
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(insertEvent).returning();
    return result[0];
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event> {
    const result = await db.update(events).set(updateData).where(eq(events.id, id)).returning();
    return result[0];
  }

  async deleteEvent(id: string): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(insertTestimonial).returning();
    return result[0];
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(desc(products.createdAt));
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return db.select().from(products).orderBy(desc(products.createdAt)).limit(3);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(insertProduct).returning();
    return result[0];
  }

  async updateProduct(id: string, updateData: Partial<InsertProduct>): Promise<Product> {
    const result = await db.update(products).set(updateData).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }

  // Journal Posts
  async getAllJournalPosts(): Promise<JournalPost[]> {
    return db.select().from(journalPosts).orderBy(desc(journalPosts.createdAt));
  }

  async getJournalPostBySlug(slug: string): Promise<JournalPost | undefined> {
    const result = await db.select().from(journalPosts).where(eq(journalPosts.slug, slug)).limit(1);
    return result[0];
  }

  async getJournalPostsByCategory(category: string): Promise<JournalPost[]> {
    return db.select().from(journalPosts).where(eq(journalPosts.category, category)).orderBy(desc(journalPosts.createdAt));
  }

  async createJournalPost(insertPost: InsertJournalPost): Promise<JournalPost> {
    const result = await db.insert(journalPosts).values(insertPost).returning();
    return result[0];
  }

  async updateJournalPost(id: string, updateData: Partial<InsertJournalPost>): Promise<JournalPost> {
    const result = await db.update(journalPosts).set(updateData).where(eq(journalPosts.id, id)).returning();
    return result[0];
  }

  async deleteJournalPost(id: string): Promise<void> {
    await db.delete(journalPosts).where(eq(journalPosts.id, id));
  }

  // Newsletter
  async subscribeToNewsletter(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    try {
      const result = await db.insert(newsletterSubscriptions).values(insertSubscription).returning();
      return result[0];
    } catch (error: any) {
      if (error?.code === '23505') {
        throw new Error("Email already subscribed");
      }
      throw error;
    }
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return db.select().from(newsletterSubscriptions).orderBy(desc(newsletterSubscriptions.createdAt));
  }
}

export const storage = new DbStorage();
