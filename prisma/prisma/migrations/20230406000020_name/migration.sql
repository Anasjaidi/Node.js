/*
  Warnings:

  - You are about to drop the column `postUid` on the `User` table. All the data in the column will be lost.
  - Added the required column `author_uid` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_postUid_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "author_uid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "postUid";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_uid_fkey" FOREIGN KEY ("author_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
