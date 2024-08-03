// export * from "@prisma/client";
// export { PrismaClient } from "@prisma/client";
// console.log("<<url", process.env.DATABASE_URL);
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma || new PrismaClient();

globalForPrisma.prisma = prisma;
