import { PrismaClient } from '@repo/database'
// the above import is not working
// import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.VERCEL_ENV !== 'production') globalForPrisma.prisma = prisma

// https://github.com/prisma/accelerate-speed-test/blob/main/lib/prisma.ts

// import { PrismaClient } from "@repo/database";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.VERCEL_ENV !== "production") globalForPrisma.prisma = prisma;
