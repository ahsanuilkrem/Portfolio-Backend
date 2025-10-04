/*
  Warnings:

  - You are about to drop the column `github` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Project" DROP COLUMN "github",
ADD COLUMN     "gitBackend" TEXT,
ADD COLUMN     "gitFrontend" TEXT;
