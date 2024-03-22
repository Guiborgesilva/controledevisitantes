/*
  Warnings:

  - You are about to drop the column `created_at` on the `Visitante` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visitante" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
