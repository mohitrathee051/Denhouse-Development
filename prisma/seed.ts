/**
 * Prisma seed script.
 * Run with: npx prisma db seed
 *
 * Populates:
 *  - one ADMIN user (for local development login)
 *  - sample properties + images   (from src/data/demo-properties.ts)
 *  - sample PG rooms + images       (from src/data/demo-pg.ts)
 *
 * All listing content is clearly marked as demo/sample data — see the
 * comments in src/data/demo-properties.ts and demo-pg.ts.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { demoProperties } from "../src/data/demo-properties";
import { demoPGRooms } from "../src/data/demo-pg";
import { toSlug } from "../src/lib/utils/slug";

const prisma = new PrismaClient();

async function seedAdminUser() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@denhousegroup.com";
  const plainPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user already exists (${email}), skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(plainPassword, 12);
  await prisma.user.create({
    data: {
      name: "Denhouse Admin",
      email,
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Created admin user: ${email} / ${plainPassword} (CHANGE THIS PASSWORD)`);
}

async function seedProperties() {
  const count = await prisma.property.count();
  if (count > 0) {
    console.log(`Properties table already has ${count} rows, skipping property seed.`);
    return;
  }

  for (const demo of demoProperties) {
    const slug = toSlug(`${demo.title}-${demo.city}`);
    await prisma.property.create({
      data: {
        title: demo.title,
        slug,
        description: demo.description,
        price: demo.price,
        priceLabel: demo.priceLabel,
        category: demo.category,
        propertyType: demo.propertyType,
        listingType: demo.listingType,
        status: demo.status,
        location: demo.location,
        city: demo.city,
        state: demo.state,
        pincode: demo.pincode,
        address: demo.address,
        bedrooms: demo.bedrooms,
        bathrooms: demo.bathrooms,
        balconies: demo.balconies,
        area: demo.area,
        areaUnit: demo.areaUnit,
        yearBuilt: demo.yearBuilt,
        furnishing: demo.furnishing,
        parking: demo.parking ?? false,
        amenities: demo.amenities ?? [],
        featured: demo.featured ?? false,
        images: {
          create: demo.images.map((img, index) => ({
            url: img.url,
            altText: img.altText,
            sortOrder: index,
            isMain: img.isMain ?? index === 0,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${demoProperties.length} sample properties.`);
}

async function seedPGRooms() {
  const count = await prisma.pGRoom.count();
  if (count > 0) {
    console.log(`PGRoom table already has ${count} rows, skipping PG seed.`);
    return;
  }

  for (const demo of demoPGRooms) {
    const slug = toSlug(`${demo.name}-${demo.city}`);
    await prisma.pGRoom.create({
      data: {
        name: demo.name,
        slug,
        description: demo.description,
        location: demo.location,
        city: demo.city,
        monthlyRent: demo.monthlyRent,
        securityDeposit: demo.securityDeposit,
        roomType: demo.roomType,
        gender: demo.gender,
        ac: demo.ac ?? false,
        wifi: demo.wifi ?? false,
        food: demo.food ?? false,
        laundry: demo.laundry ?? false,
        parking: demo.parking ?? false,
        housekeeping: demo.housekeeping ?? false,
        availability: demo.availability ?? "AVAILABLE",
        featured: demo.featured ?? false,
        images: {
          create: demo.images.map((img, index) => ({
            url: img.url,
            altText: img.altText,
            sortOrder: index,
            isMain: img.isMain ?? index === 0,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${demoPGRooms.length} sample PG rooms.`);
}

async function main() {
  await seedAdminUser();
  await seedProperties();
  await seedPGRooms();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
