// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '@repo/database'

// import { env } from "@/env.mjs";

// const createPrismaClient = () =>
//   new PrismaClient({
//     log:
//       env.VERCEL_ENV === "development" ? ["query", "error", "warn"] : ["error"],
//   });

// const globalForPrisma = globalThis as unknown as {
//   prisma: ReturnType<typeof createPrismaClient> | undefined;
// };

// export const db = globalForPrisma.prisma ?? createPrismaClient();

// if (env.VERCEL_ENV !== "production") globalForPrisma.prisma = db;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.VERCEL_ENV !== 'production') globalForPrisma.prisma = db
