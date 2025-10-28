import { db } from "./db";
import { collections, poems, events, testimonials, products, journalPosts } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed Collections
  const [healingCollection, becomingCollection, cityLightCollection] = await db.insert(collections).values([
    {
      title: "Healing",
      slug: "healing",
      description: "Poems that explore the journey of healing, self-discovery, and gentle transformation.",
    },
    {
      title: "Becoming",
      slug: "becoming",
      description: "Reflections on identity, growth, and the courage to evolve into who you're meant to be.",
    },
    {
      title: "City Light",
      slug: "city-light",
      description: "Urban poetry capturing the pulse of the city, its people, and fleeting moments of connection.",
    },
  ]).returning();

  console.log("Created collections");

  // Seed Poems
  await db.insert(poems).values([
    {
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
    },
    {
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
      themes: ["Self-acceptance", "Growth", "Courage"],
      imageUrl: null,
    },
    {
      title: "Rush Hour Revelations",
      slug: "rush-hour-revelations",
      body: `On the 6 train at 8 AM,
I catch glimpses of strangers
carrying whole universes
in their tired eyes.

The woman with headphones,
the man clutching coffee like a lifeline,
the student reviewing flashcards—
each one a story I'll never know.

In this metal tube hurtling underground,
we're all going somewhere,
running from something,
hoping for more.`,
      excerpt: "On the 6 train at 8 AM, I catch glimpses of strangers carrying whole universes in their tired eyes...",
      audioUrl: null,
      transcript: null,
      collectionId: cityLightCollection.id,
      themes: ["Urban Life", "Connection", "Humanity"],
      imageUrl: null,
    },
  ]);

  console.log("Created poems");

  // Seed Events
  await db.insert(events).values([
    {
      title: "Poetry Night at The Loft",
      date: new Date("2025-02-15T19:00:00"),
      city: "Brooklyn, NY",
      venue: "The Loft Literary Center",
      link: "https://example.com/tickets",
      isPast: false,
    },
    {
      title: "Healing Through Words Workshop",
      date: new Date("2024-11-10T18:30:00"),
      city: "Manhattan, NY",
      venue: "Community Arts Space",
      link: null,
      isPast: true,
    },
  ]);

  console.log("Created events");

  // Seed Testimonials
  await db.insert(testimonials).values([
    {
      quote: "Fatimah's poetry has a way of holding you gently while challenging you deeply. Her words resonate long after the performance ends.",
      name: "Aisha Williams",
      role: "Poet & Educator",
      source: null,
    },
    {
      quote: "Every performance is a masterclass in vulnerability and strength. Fatimah creates spaces where healing feels possible.",
      name: "Marcus Chen",
      role: "Event Curator",
      source: "Brooklyn Arts Review",
    },
  ]);

  console.log("Created testimonials");

  // Seed Products
  await db.insert(products).values([
    {
      title: "Healing: The Collection",
      blurb: "A curated collection of poems exploring the tender journey of healing and self-discovery.",
      priceText: "$18",
      buyUrl: "https://gumroad.com/example",
      imageUrl: null,
      details: "48 pages, soft cover, limited edition",
    },
    {
      title: "Becoming Print",
      blurb: "Limited edition art print featuring the poem 'Letters to Myself' in elegant calligraphy.",
      priceText: "$35",
      buyUrl: "https://gumroad.com/example",
      imageUrl: null,
      details: "12x16 inches, archival quality",
    },
    {
      title: "Audio Poetry Collection",
      blurb: "Digital download of 10 poems performed by Fatimah with original background music.",
      priceText: "$12",
      buyUrl: "https://gumroad.com/example",
      imageUrl: null,
      details: "High-quality MP3, instant download",
    },
  ]);

  console.log("Created products");

  // Seed Journal Posts
  await db.insert(journalPosts).values([
    {
      title: "On Writing Through Grief",
      slug: "on-writing-through-grief",
      body: `Grief has taught me that healing isn't linear. Some days I write with clarity, other days the words feel heavy, reluctant to leave the page.

But I keep writing. Because poetry has become my way of holding what feels too big to carry alone. Each poem is a conversation with myself, a letter to the parts of me that need witnessing.

Writing through grief means allowing the mess. It means not rushing to resolution. It means trusting that the words will come, even when they take their time.`,
      excerpt: "Grief has taught me that healing isn't linear. Some days I write with clarity, other days the words feel heavy...",
      category: "Reflections",
      audioUrl: null,
      imageUrl: null,
    },
  ]);

  console.log("Created journal posts");
  console.log("Seed complete!");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
