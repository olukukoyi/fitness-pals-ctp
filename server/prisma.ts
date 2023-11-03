// import { PrismaClient } from "@prisma/client";

const PrismaClient = require("@prisma/client")
// boiler plater to acess our db whenever and wherever we want
// easily can create instances of our db

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;