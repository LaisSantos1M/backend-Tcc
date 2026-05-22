-- CreateTable
CREATE TABLE "Livros" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "editora" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_EscritorToLivros" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_EscritorToLivros_A_fkey" FOREIGN KEY ("A") REFERENCES "Escritor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_EscritorToLivros_B_fkey" FOREIGN KEY ("B") REFERENCES "Livros" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_EscritorToLivros_AB_unique" ON "_EscritorToLivros"("A", "B");

-- CreateIndex
CREATE INDEX "_EscritorToLivros_B_index" ON "_EscritorToLivros"("B");
