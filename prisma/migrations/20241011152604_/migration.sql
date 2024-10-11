/*
  Warnings:

  - Made the column `parent_id` on table `permission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `permission` MODIFY `parent_id` INTEGER NOT NULL DEFAULT 0;
