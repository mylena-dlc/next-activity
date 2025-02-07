import { PrismaClient } from "@prisma/client";

// Vérifier si Prisma existe déjà dans globalThis
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Utiliser l'instance existante ou en créer une nouvelle
export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
