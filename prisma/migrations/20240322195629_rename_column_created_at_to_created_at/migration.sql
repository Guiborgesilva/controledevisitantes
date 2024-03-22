/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Visitante` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visitante" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
