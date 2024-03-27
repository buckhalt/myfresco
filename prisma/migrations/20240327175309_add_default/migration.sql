-- CreateEnum
CREATE TYPE "Version" AS ENUM ('v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'inactive', 'deleted');

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "Protocol" ADD COLUMN     "version" "Version" NOT NULL DEFAULT 'v7',
ALTER COLUMN "schemaVersion" DROP NOT NULL,
ALTER COLUMN "schemaVersion" SET DEFAULT 7;
