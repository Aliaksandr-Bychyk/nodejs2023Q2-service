-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Albums" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,

    CONSTRAINT "Albums_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tracks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumsId" TEXT,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Tracks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesArtists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesAlbums" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_FavoritesTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesArtists_AB_unique" ON "_FavoritesArtists"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesArtists_B_index" ON "_FavoritesArtists"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesAlbums_AB_unique" ON "_FavoritesAlbums"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesAlbums_B_index" ON "_FavoritesAlbums"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesTracks_AB_unique" ON "_FavoritesTracks"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesTracks_B_index" ON "_FavoritesTracks"("B");

-- AddForeignKey
ALTER TABLE "Albums" ADD CONSTRAINT "Albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artists"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tracks" ADD CONSTRAINT "Tracks_albumsId_fkey" FOREIGN KEY ("albumsId") REFERENCES "Albums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesArtists" ADD CONSTRAINT "_FavoritesArtists_A_fkey" FOREIGN KEY ("A") REFERENCES "Artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesArtists" ADD CONSTRAINT "_FavoritesArtists_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesAlbums" ADD CONSTRAINT "_FavoritesAlbums_A_fkey" FOREIGN KEY ("A") REFERENCES "Albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesAlbums" ADD CONSTRAINT "_FavoritesAlbums_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTracks" ADD CONSTRAINT "_FavoritesTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesTracks" ADD CONSTRAINT "_FavoritesTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
