import { db } from "./db";
import { collections, poems, events, products, journalPosts, testimonials } from "@shared/schema";

export async function seedPoetryContent() {
  console.log("🌹 Seeding Poetically Fatimah content...");

  // Create Collections
  const collectionData = [
    {
      title: "Healing",
      slug: "healing",
      description: "Poetry that tends to wounds we thought would never close. Words for the parts of you still learning to breathe.",
      imageUrl: "",
    },
    {
      title: "Becoming",
      slug: "becoming",
      description: "The journey from who you were to who you're meant to be. Growth looks messy before it looks beautiful.",
      imageUrl: "",
    },
    {
      title: "Love Letters",
      slug: "love-letters",
      description: "For the ones who loved us through it. For the love that stayed when we couldn't.",
      imageUrl: "",
    },
    {
      title: "Identity & Belonging",
      slug: "identity",
      description: "Finding home in yourself when the world feels foreign. Poetry for the in-between.",
      imageUrl: "",
    },
  ];

  const insertedCollections: { [key: string]: string } = {};
  
  for (const collection of collectionData) {
    const result = await db.insert(collections).values(collection).onConflictDoNothing().returning();
    if (result.length > 0) {
      insertedCollections[collection.slug] = result[0].id;
    } else {
      // Collection already exists, fetch its ID
      const existing = await db.select().from(collections).where(({ slug }) => slug === collection.slug).limit(1);
      if (existing.length > 0) {
        insertedCollections[collection.slug] = existing[0].id;
      }
    }
  }

  console.log("✅ Collections created");

  // Create Powerful Poems (using collected IDs)
  const poemData = [
    {
      title: "Soft Power",
      slug: "soft-power",
      body: `I used to think strength meant hardening.\n\nBuilding walls so high\nno one could reach me.\nNo one could hurt me.\n\nBut softness—\nsoftness is the real revolution.\n\nTo stay tender\nin a world that celebrates armor.\n\nTo lead with love\nwhen anger would be easier.\n\nTo choose healing\nover hardening.\n\nThat's not weakness.\nThat's warrior work.\n\nSo yes, I am soft.\nAnd yes, I am powerful.\n\nBoth can be true.`,
      excerpt: "I used to think strength meant hardening. But softness—softness is the real revolution.",
      collectionId: insertedCollections["becoming"],
      themes: ["Strength", "Softness", "Growth", "Power"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
    {
      title: "Healing Is Not Linear",
      slug: "healing-is-not-linear",
      body: `Some days you wake up\nand the wound feels ancient.\nLike it happened to someone else\nin a life you barely remember.\n\nOther days\nit's fresh.\nBleeding through bandages\nyou thought had already healed.\n\nAnd both are okay.\n\nHealing isn't a straight line.\nIt's a spiral.\nYou revisit the same pain\nat different altitudes.\n\nEach time,\nyou see it differently.\nEach time,\nyou're stronger than before.\n\nSo if you find yourself\nback where you started—\n\nLook closer.\n\nYou're not where you were.\nYou're where you need to be\nto heal the next layer.`,
      excerpt: "Healing isn't a straight line. It's a spiral. You revisit the same pain at different altitudes.",
      collectionId: insertedCollections["healing"],
      themes: ["Healing", "Growth", "Journey", "Patience"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
    {
      title: "My Love Language",
      slug: "my-love-language",
      body: `My love language is\nshowing up when it's inconvenient.\n\nStaying when it would be easier to leave.\n\nHolding space\nfor your mess\nwithout trying to clean it.\n\nMy love language is\nconsistency.\n\nNot grand gestures,\nbut small ones.\nRepeated.\nReliable.\nReal.\n\nIt's checking in\nwhen you haven't asked.\n\nIt's remembering\nthe details you mentioned\nthree months ago.\n\nMy love language is\nmaking you feel safe enough\nto be all of who you are—\n\nEven the parts\nyou're still learning to love.`,
      excerpt: "My love language is showing up when it's inconvenient. Staying when it would be easier to leave.",
      collectionId: insertedCollections["love-letters"],
      themes: ["Love", "Consistency", "Presence", "Devotion"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
    {
      title: "Reclaiming",
      slug: "reclaiming",
      body: `I am reclaiming\nthe parts of me\nI gave away\nto keep the peace.\n\nMy voice.\nMy boundaries.\nMy right to take up space.\n\nI am reclaiming\nmy name\nfrom the mouths\nthat said it like a burden.\n\nI am reclaiming\nmy body\nfrom the hands\nthat treated it like property.\n\nI am reclaiming\nmy story\nfrom the narrators\nwho rewrote it\nto absolve themselves.\n\nThis is my life.\nMy journey.\nMy truth.\n\nAnd I'm taking it all back.`,
      excerpt: "I am reclaiming the parts of me I gave away to keep the peace.",
      collectionId: insertedCollections["identity"],
      themes: ["Identity", "Boundaries", "Power", "Self-Worth"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
    {
      title: "Letters That Linger",
      slug: "letters-that-linger",
      body: `These are the letters I never sent.\n\nThe ones written at 3 AM\nwhen missing you felt like drowning.\n\nThe ones where I told you\neverything I was too scared\nto say out loud.\n\nThat I loved you\neven when you made it hard.\n\nThat I forgave you\neven when you never asked.\n\nThat I saw the best in you\neven when you couldn't see it yourself.\n\nThese letters will never reach you.\n\nBut writing them\nset me free.`,
      excerpt: "These are the letters I never sent. The ones written at 3 AM when missing you felt like drowning.",
      collectionId: insertedCollections["love-letters"],
      themes: ["Love", "Loss", "Letting Go", "Healing"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
    {
      title: "The Unbecoming",
      slug: "unbecoming",
      body: `Before you become,\nyou must unbecome.\n\nStrip away\nthe version of you\nbuilt to please everyone else.\n\nThe smile that costs you your peace.\nThe yes that should have been no.\nThe silence that swallowed your truth.\n\nUnbecoming is painful.\n\nIt's realizing\nthe armor you wore for protection\nwas actually a prison.\n\nIt's watching people leave\nwhen you stop performing.\n\nIt's grieving\nthe person you pretended to be.\n\nBut on the other side\nof unbecoming—\n\nYou'll find yourself.\n\nRaw.\nReal.\nFinally free.`,
      excerpt: "Before you become, you must unbecome. Strip away the version of you built to please everyone else.",
      collectionId: insertedCollections["becoming"],
      themes: ["Transformation", "Authenticity", "Growth", "Freedom"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
    {
      title: "Diaspora Daughter",
      slug: "diaspora-daughter",
      body: `I am too much of one thing\nand not enough of another.\n\nToo Western for home.\nToo foreign for here.\n\nCaught between languages\nI speak fluently\nbut never quite perfectly.\n\nBetween traditions\nI honor\nbut can't fully claim.\n\nI am the hyphen.\nThe in-between.\nThe both-and.\n\nAnd some days,\nthat feels like exile.\n\nBut most days,\nit feels like freedom.\n\nBecause I get to choose\nwhich parts of each world\nI carry with me.\n\nI get to build a home\nthat looks like neither\nand somehow\nboth.\n\nI am a bridge\nbetween worlds.\n\nAnd that's not loss—\n\nThat's legacy.`,
      excerpt: "I am too much of one thing and not enough of another. Caught between worlds, building a home that's both.",
      collectionId: insertedCollections["identity"],
      themes: ["Identity", "Diaspora", "Belonging", "Heritage"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
    {
      title: "Permission",
      slug: "permission",
      body: `You don't need permission\nto take up space.\n\nTo be loud\nwhen they expect you to whisper.\n\nTo be soft\nwhen they need you to be steel.\n\nYou don't need permission\nto change your mind.\n\nTo grow past\nwho you used to be.\n\nTo outgrow\npeople who can't grow with you.\n\nYou don't need permission\nto rest.\n\nTo say no.\n\nTo choose yourself\nfor once.\n\nYou don't need anyone's approval\nto exist exactly as you are.\n\nYou never did.`,
      excerpt: "You don't need permission to take up space. To exist exactly as you are. You never did.",
      collectionId: insertedCollections["becoming"],
      themes: ["Self-Worth", "Boundaries", "Freedom", "Empowerment"],
      imageUrl: "",
      audioUrl: "",
      transcript: "",
    },
  ];

  for (const poem of poemData) {
    await db.insert(poems).values(poem).onConflictDoNothing();
  }

  console.log("✅ Poems created");

  // Create Testimonials
  const testimonialData = [
    {
      name: "Sarah M.",
      role: "Audience Member",
      quote: "Fatimah's poetry doesn't just speak to you—it reaches inside and pulls out the words you've been searching for your whole life.",
    },
    {
      name: "Dr. Maya Johnson",
      role: "University Professor",
      quote: "I've assigned Fatimah's work to my students for three years running. Her ability to articulate the complexities of identity and belonging is unmatched.",
    },
    {
      name: "James K.",
      role: "Event Organizer",
      quote: "Fatimah held our entire audience captive. The standing ovation lasted five minutes. Her performance was the highlight of our festival.",
    },
    {
      name: "Aisha R.",
      role: "Reader",
      quote: "Her poetry on healing helped me through the darkest season of my life. I keep her book by my bedside and read it when I need to remember I'm not alone.",
    },
  ];

  for (const testimonial of testimonialData) {
    await db.insert(testimonials).values(testimonial).onConflictDoNothing();
  }

  console.log("✅ Testimonials created");

  // Create Events
  const eventData = [
    {
      title: "Voices of the Diaspora Poetry Festival",
      date: new Date("2024-12-15T19:00:00"),
      city: "Brooklyn, NY",
      venue: "Brooklyn Arts Center",
      link: "https://example.com/tickets",
    },
    {
      title: "Healing Through Words Workshop",
      date: new Date("2025-01-20T14:00:00"),
      city: "Los Angeles, CA",
      venue: "Community Writing Center",
      link: "https://example.com/workshop",
    },
  ];

  for (const event of eventData) {
    await db.insert(events).values(event).onConflictDoNothing();
  }

  console.log("✅ Events created");

  // Create Products
  const productData = [
    {
      title: "Soft Power: Collected Poems",
      slug: "soft-power-book",
      blurb: "The debut poetry collection exploring strength, softness, and the revolutionary act of staying tender in a hardening world.",
      priceText: "$18.99",
      buyUrl: "https://example.com/shop/soft-power",
      isFeatured: true,
      imageUrl: "",
    },
    {
      title: "Healing Is Not Linear - Art Print",
      slug: "healing-print",
      blurb: "Beautiful 11x14 art print featuring the beloved poem. Perfect for your healing space.",
      priceText: "$25.00",
      buyUrl: "https://example.com/shop/healing-print",
      isFeatured: true,
      imageUrl: "",
    },
    {
      title: "Letters That Linger - Digital Download",
      slug: "letters-digital",
      blurb: "Instant access to exclusive poems about love, loss, and letting go. PDF format with beautiful typography.",
      priceText: "$7.99",
      buyUrl: "https://example.com/shop/letters-digital",
      isFeatured: false,
      imageUrl: "",
    },
  ];

  for (const product of productData) {
    await db.insert(products).values(product).onConflictDoNothing();
  }

  console.log("✅ Products created");

  // Create Journal Posts
  const journalData = [
    {
      title: "On Writing Through Pain",
      slug: "writing-through-pain",
      body: `There's a misconception that you have to wait until you've healed to write about your pain. That you need distance, perspective, closure before you can turn trauma into art.\n\nBut some of my most honest work came from the middle of it. From the thick of grief. From the depths of confusion.\n\nWriting wasn't something I did after healing—it was how I healed.\n\nThe page became the first place I could tell the truth. The first place where my mess was allowed to be messy. Where I didn't have to perform strength or pretend I had it all figured out.\n\nIf you're waiting until you've "processed" everything before you write, you might be waiting forever. Sometimes the processing happens on the page.\n\nWrite anyway. Write messy. Write confused. Write angry.\n\nYour future self will thank you for leaving breadcrumbs.`,
      excerpt: "Writing wasn't something I did after healing—it was how I healed.",
      category: "Writing Life",
      imageUrl: "",
    },
    {
      title: "Behind the Poem: 'Soft Power'",
      slug: "behind-soft-power",
      body: `"Soft Power" was born from exhaustion.\n\nI was tired of being told that my softness made me weak. Tired of hearing that leading with empathy was naive. Tired of watching the world celebrate hardness while punishing tenderness.\n\nI wrote this poem as a love letter to everyone who's been told they care too much. Feel too deeply. Give too freely.\n\nBecause in a world that profits from our numbness, choosing to stay soft is an act of rebellion.\n\nThe poem came to me all at once—which rarely happens. Usually I labor over every line, but this one poured out in a single sitting. Like it had been waiting.\n\nNow when I perform it, I watch people in the audience nod. I see them mouth the words along with me. And I know I'm not alone in this.\n\nWe're all trying to stay tender in a hardening world.\n\nAnd that's not weakness.\n\nThat's power.`,
      excerpt: "In a world that profits from our numbness, choosing to stay soft is an act of rebellion.",
      category: "Behind the Poems",
      imageUrl: "",
    },
  ];

  for (const post of journalData) {
    await db.insert(journalPosts).values(post).onConflictDoNothing();
  }

  console.log("✅ Journal posts created");
  console.log("🌹 Poetry content seeding complete!");
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPoetryContent()
    .then(() => {
      console.log("✅ Done!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Seeding failed:", error);
      process.exit(1);
    });
}
