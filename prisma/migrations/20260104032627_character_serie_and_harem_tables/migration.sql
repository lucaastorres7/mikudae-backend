-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ANIME', 'GAME', 'BOTH');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('WAIFU', 'HUSBANDO', 'BOTH');

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "category" "Category" NOT NULL,
    "images" TEXT[],
    "kakeraValue" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Serie" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Serie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Harem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,

    CONSTRAINT "Harem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharactersOnSeries" (
    "characterId" INTEGER NOT NULL,
    "serieId" INTEGER NOT NULL,

    CONSTRAINT "CharactersOnSeries_pkey" PRIMARY KEY ("characterId","serieId")
);

-- CreateTable
CREATE TABLE "CharacterOwnership" (
    "id" SERIAL NOT NULL,
    "haremId" INTEGER NOT NULL,
    "characterId" INTEGER NOT NULL,

    CONSTRAINT "CharacterOwnership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Harem_ownerId_serverId_key" ON "Harem"("ownerId", "serverId");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterOwnership_haremId_characterId_key" ON "CharacterOwnership"("haremId", "characterId");

-- AddForeignKey
ALTER TABLE "CharactersOnSeries" ADD CONSTRAINT "CharactersOnSeries_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnSeries" ADD CONSTRAINT "CharactersOnSeries_serieId_fkey" FOREIGN KEY ("serieId") REFERENCES "Serie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterOwnership" ADD CONSTRAINT "CharacterOwnership_haremId_fkey" FOREIGN KEY ("haremId") REFERENCES "Harem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharacterOwnership" ADD CONSTRAINT "CharacterOwnership_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
