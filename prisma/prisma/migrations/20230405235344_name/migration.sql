-- CreateTable
CREATE TABLE "basket_a" (
    "a" INTEGER NOT NULL,
    "fruit_a" VARCHAR(100) NOT NULL,

    CONSTRAINT "basket_a_pkey" PRIMARY KEY ("a")
);

-- CreateTable
CREATE TABLE "basket_b" (
    "b" INTEGER NOT NULL,
    "fruit_b" VARCHAR(100) NOT NULL,

    CONSTRAINT "basket_b_pkey" PRIMARY KEY ("b")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(15),

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(45),
    "last_name" VARCHAR(45),
    "email" VARCHAR(45),

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "uid" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "postUid" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_postUid_fkey" FOREIGN KEY ("postUid") REFERENCES "Post"("uid") ON DELETE SET NULL ON UPDATE CASCADE;
