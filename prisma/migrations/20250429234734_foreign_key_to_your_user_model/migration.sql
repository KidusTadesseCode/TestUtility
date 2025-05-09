/*
  Warnings:

  - You are about to drop the column `lastCommitMsg` on the `Branch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,installationId]` on the table `GithubAccount` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[githubAccountId,githubRepoId]` on the table `Repository` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `installationId` to the `GithubAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `githubRepoId` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Repository_fullName_key";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "lastCommitMsg";

-- AlterTable
ALTER TABLE "GithubAccount" ADD COLUMN     "installationId" TEXT NOT NULL,
ALTER COLUMN "githubUserId" DROP NOT NULL,
ALTER COLUMN "githubUsername" DROP NOT NULL,
ALTER COLUMN "accessToken" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "githubRepoId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GithubAccount_userId_installationId_key" ON "GithubAccount"("userId", "installationId");

-- CreateIndex
CREATE UNIQUE INDEX "Repository_githubAccountId_githubRepoId_key" ON "Repository"("githubAccountId", "githubRepoId");
