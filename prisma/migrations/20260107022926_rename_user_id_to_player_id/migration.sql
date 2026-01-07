/*
  Warnings:

  - You are about to drop the column `userId` on the `MobParticipant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sessionId,playerId]` on the table `MobParticipant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerId` to the `MobParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MobParticipant_sessionId_userId_key";

-- AlterTable
ALTER TABLE "MobParticipant" DROP COLUMN "userId",
ADD COLUMN     "playerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MobParticipant_sessionId_playerId_key" ON "MobParticipant"("sessionId", "playerId");
