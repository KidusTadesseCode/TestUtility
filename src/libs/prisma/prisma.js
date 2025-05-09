// src/libs/prisma/prisma.js
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["info", "warn", "error"],
    errorFormat: "pretty",
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
