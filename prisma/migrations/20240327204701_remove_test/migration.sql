/*
  Warnings:

  - You are about to drop the column `status` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Protocol` table. All the data in the column will be lost.
  - Made the column `schemaVersion` on table `Protocol` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Protocol" DROP COLUMN "version",
ALTER COLUMN "schemaVersion" SET NOT NULL,
ALTER COLUMN "schemaVersion" DROP DEFAULT;

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "Version";
