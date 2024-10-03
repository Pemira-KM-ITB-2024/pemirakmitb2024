-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Administrator', 'Voting');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" TEXT NOT NULL,
    "nim" TEXT NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT,
    "voted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoteK3M" (
    "id" TEXT NOT NULL,
    "pil_1" TEXT NOT NULL,
    "pil_2" TEXT,
    "pil_3" TEXT,
    "pil_4" TEXT,
    "adminId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_token_key" ON "Mahasiswa"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VoteK3M_id_key" ON "VoteK3M"("id");

-- AddForeignKey
ALTER TABLE "VoteK3M" ADD CONSTRAINT "VoteK3M_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
