-- CreateTable
CREATE TABLE "Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "precession" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "row" BYTEA NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);
