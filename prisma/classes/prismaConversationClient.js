import { PrismaClient } from "@prisma/client";


class PrismaClientRepository {
  constructor(conf) {
    this.prisma = new PrismaClient();
    this.cnv = this.prisma.conversation
  }
}