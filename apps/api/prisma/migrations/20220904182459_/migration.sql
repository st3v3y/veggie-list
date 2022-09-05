/*
  Warnings:

  - You are about to alter the column `unit` on the `Veggie` table. The data in that column could be lost. The data in that column will be cast from `Enum("Veggie_unit")` to `Enum("Veggie_unit")`.

*/
-- AlterTable
ALTER TABLE `Veggie` MODIFY `unit` ENUM('unit', 'libra', 'kilogram', 'gram') NOT NULL DEFAULT 'unit';
