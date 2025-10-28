import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ObjectStorageService } from "./objectStorage";
import { insertNewsletterSubscriptionSchema, insertPoemSchema, insertCollectionSchema, insertEventSchema, insertProductSchema, insertJournalPostSchema } from "@shared/schema";
import { requireAuth } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Object Storage - Public assets serving
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Collections
  app.get("/api/collections", async (_req, res) => {
    try {
      const collections = await storage.getAllCollections();
      res.json(collections);
    } catch (error) {
      console.error("Error fetching collections:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/collections/:slug", async (req, res) => {
    try {
      const collection = await storage.getCollectionBySlug(req.params.slug);
      if (!collection) {
        return res.status(404).json({ error: "Collection not found" });
      }
      res.json(collection);
    } catch (error) {
      console.error("Error fetching collection:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/collections", requireAuth, async (req, res) => {
    try {
      const validated = insertCollectionSchema.parse(req.body);
      const collection = await storage.createCollection(validated);
      res.json(collection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating collection:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/collections/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteCollection(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Poems
  app.get("/api/poems", async (req, res) => {
    try {
      const { collectionId } = req.query;
      
      if (collectionId && typeof collectionId === "string") {
        const poems = await storage.getPoemsByCollectionId(collectionId);
        return res.json(poems);
      }
      
      const poems = await storage.getAllPoems();
      res.json(poems);
    } catch (error) {
      console.error("Error fetching poems:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/poems/spotlight", async (_req, res) => {
    try {
      const poem = await storage.getSpotlightPoem();
      if (!poem) {
        return res.status(404).json({ error: "No poems available" });
      }
      res.json(poem);
    } catch (error) {
      console.error("Error fetching spotlight poem:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/poems/by-slug/:slug", async (req, res) => {
    try {
      const poem = await storage.getPoemBySlug(req.params.slug);
      if (!poem) {
        return res.status(404).json({ error: "Poem not found" });
      }
      res.json(poem);
    } catch (error) {
      console.error("Error fetching poem:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/poems", requireAuth, async (req, res) => {
    try {
      const validated = insertPoemSchema.parse(req.body);
      const poem = await storage.createPoem(validated);
      res.json(poem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating poem:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/poems/:id", requireAuth, async (req, res) => {
    try {
      await storage.deletePoem(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting poem:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Events
  app.get("/api/events", async (_req, res) => {
    try {
      const events = await storage.getAllEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events/upcoming", async (_req, res) => {
    try {
      const events = await storage.getUpcomingEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events/past", async (_req, res) => {
    try {
      const events = await storage.getPastEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching past events:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/events", requireAuth, async (req, res) => {
    try {
      console.log("Event creation request body:", JSON.stringify(req.body, null, 2));
      const validated = insertEventSchema.parse(req.body);
      console.log("Validated event data:", JSON.stringify(validated, null, 2));
      const event = await storage.createEvent(validated);
      res.json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Zod validation error:", JSON.stringify(error.errors, null, 2));
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/events/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Testimonials
  app.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials = await storage.getAllTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Products
  app.get("/api/products", async (_req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/products/featured", async (_req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/products", requireAuth, async (req, res) => {
    try {
      const validated = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validated);
      res.json(product);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteProduct(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Journal Posts
  app.get("/api/journal", async (req, res) => {
    try {
      const { category } = req.query;
      
      if (category && typeof category === "string") {
        const posts = await storage.getJournalPostsByCategory(category);
        return res.json(posts);
      }
      
      const posts = await storage.getAllJournalPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching journal posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/journal/:slug", async (req, res) => {
    try {
      const post = await storage.getJournalPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ error: "Journal post not found" });
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching journal post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/journal", requireAuth, async (req, res) => {
    try {
      const validated = insertJournalPostSchema.parse(req.body);
      const post = await storage.createJournalPost(validated);
      res.json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Validation error", details: error.errors });
      }
      console.error("Error creating journal post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/journal/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteJournalPost(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting journal post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Newsletter
  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = insertNewsletterSubscriptionSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid email address",
          details: result.error.issues 
        });
      }

      const subscription = await storage.subscribeToNewsletter(result.data);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof Error && error.message === "Email already subscribed") {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/newsletter/subscribers", requireAuth, async (_req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscriptions();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
