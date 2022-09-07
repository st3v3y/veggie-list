/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Veggie` table. All the data in the column will be lost.
  - Added the required column `name_es` to the `Veggie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Veggie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Veggie_name_key` ON `Veggie`;

-- AlterTable
ALTER TABLE `Veggie` DROP COLUMN `updatedAt`,
    ADD COLUMN `name_es` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
