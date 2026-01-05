-- CreateEnum
CREATE TYPE "GameMode" AS ENUM ('MODE_1', 'MODE_2');

-- CreateTable
CREATE TABLE "ServerConfig" (
    "serverId" TEXT NOT NULL,
    "gameMode" "GameMode" NOT NULL DEFAULT 'MODE_1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServerConfig_pkey" PRIMARY KEY ("serverId")
);
