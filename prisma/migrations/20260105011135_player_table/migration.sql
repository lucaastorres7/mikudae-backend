-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "rollsCount" INTEGER NOT NULL DEFAULT 0,
    "lastInteraction" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Harem" ADD CONSTRAINT "Harem_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
