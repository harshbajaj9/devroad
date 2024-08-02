"use server";

// import { prisma } from "../app/lib/db";
import { prisma } from "@repo/database";

export const testServerAction = async () => {
  const data = await prisma.demoTable.findMany();
  console.log(data);
};
