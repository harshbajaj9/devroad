// import { PrismaClient } from "@repo/database";

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }
// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

// https://github.com/prisma/accelerate-speed-test/blob/main/lib/prisma.ts

// import { PrismaClient } from "@repo/database";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma: PrismaClient =
//   // globalForPrisma.prisma || new PrismaClient();
//   globalForPrisma.prisma ||
//   new PrismaClient({ datasources: { db: { url: process.env.DATABASE_URL } } });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
