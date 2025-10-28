import { db } from "./db";
import { adminUsers } from "@shared/schema";
import bcrypt from "bcrypt";

async function createAdmin() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123"; // Change this!
  const email = process.env.ADMIN_EMAIL || "admin@poeticallyfatimah.com";

  console.log("Creating admin user...");

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const [admin] = await db.insert(adminUsers).values({
      username,
      passwordHash,
      email,
    }).returning();

    console.log(`Admin user created successfully:`);
    console.log(`Username: ${admin.username}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Please change the default password immediately!`);
  } catch (error: any) {
    if (error?.code === '23505') {
      console.log("Admin user already exists");
    } else {
      throw error;
    }
  }
}

createAdmin().catch((error) => {
  console.error("Failed to create admin:", error);
  process.exit(1);
});
