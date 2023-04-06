-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "id" BIGSERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imagePath" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);
