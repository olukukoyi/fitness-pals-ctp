/*
  Warnings:

  - Added the required column `calories` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carb` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealType` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `protein` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servings` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "calories" INTEGER NOT NULL,
ADD COLUMN     "carb" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fat" INTEGER NOT NULL,
ADD COLUMN     "mealType" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "protein" INTEGER NOT NULL,
ADD COLUMN     "servings" INTEGER NOT NULL,
ADD COLUMN     "userUserId" TEXT;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
