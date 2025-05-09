/*
  Warnings:

  - You are about to drop the column `aiModelName` on the `Message` table. All the data in the column will be lost.
  - Added the required column `aiModelName` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "aiModelName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "aiModelName";
