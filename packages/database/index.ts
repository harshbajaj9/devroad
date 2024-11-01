// export * from "@prisma/client";
export * from "./node_modules/.prisma/client";
// exporting prisma client and enums separately as it was giving error while importing in db.ts
// export { PrismaClient } from "@prisma/client";
export { PrismaClient } from "./node_modules/.prisma/client";
// export * from "./common-types";
