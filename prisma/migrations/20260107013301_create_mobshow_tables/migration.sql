-- CreateEnum
CREATE TYPE "MobStatus" AS ENUM ('ACTIVE', 'WAITING', 'FINISHED');

-- CreateTable
CREATE TABLE "MobSession" (
    "id" SERIAL NOT NULL,
    "serverId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "status" "MobStatus" NOT NULL DEFAULT 'WAITING',
    "winner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobParticipant" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MobParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MobParticipant_sessionId_userId_key" ON "MobParticipant"("sessionId", "userId");

-- AddForeignKey
ALTER TABLE "MobParticipant" ADD CONSTRAINT "MobParticipant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "MobSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
