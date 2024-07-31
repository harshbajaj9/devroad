export * from "@prisma/client";
// exporting prisma client and enums separately as it was giving error while importing in db.ts
export { PrismaClient } from "@prisma/client";
// export * from "./common-types";
