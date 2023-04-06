-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('ASSISTANT', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imagePath" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_uid_fkey" FOREIGN KEY ("conversation_uid") REFERENCES "Conversation"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
