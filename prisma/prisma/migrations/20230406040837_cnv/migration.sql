/*
  Warnings:

  - You are about to drop the `Types` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('ASSISTANT', 'USER');

-- DropTable
DROP TABLE "Types";

-- CreateTable
CREATE TABLE "Conversation" (
    "uid" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "message" (
    "uid" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "content" TEXT NOT NULL,
    "conversation_uid" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("uid")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_uid_fkey" FOREIGN KEY ("conversation_uid") REFERENCES "Conversation"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
