/*
  Warnings:

  - The values [faible,moyenne,haute] on the enum `LeadPriority` will be removed. If these variants are still used in the database, this will fail.
  - The values [nouveau,contacte,qualifie,proposition,gagne,perdu] on the enum `LeadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeadPriority_new" AS ENUM ('FAIBLE', 'MOYENNE', 'HAUTE');
ALTER TABLE "public"."Lead" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "Lead" ALTER COLUMN "priority" TYPE "LeadPriority_new" USING ("priority"::text::"LeadPriority_new");
ALTER TYPE "LeadPriority" RENAME TO "LeadPriority_old";
ALTER TYPE "LeadPriority_new" RENAME TO "LeadPriority";
DROP TYPE "public"."LeadPriority_old";
ALTER TABLE "Lead" ALTER COLUMN "priority" SET DEFAULT 'MOYENNE';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "LeadStatus_new" AS ENUM ('NOUVEAU', 'QUALIFIE', 'NRP', 'ANNULE');
ALTER TABLE "public"."Lead" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lead" ALTER COLUMN "status" TYPE "LeadStatus_new" USING ("status"::text::"LeadStatus_new");
ALTER TYPE "LeadStatus" RENAME TO "LeadStatus_old";
ALTER TYPE "LeadStatus_new" RENAME TO "LeadStatus";
DROP TYPE "public"."LeadStatus_old";
ALTER TABLE "Lead" ALTER COLUMN "status" SET DEFAULT 'NOUVEAU';
COMMIT;

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "status" SET DEFAULT 'NOUVEAU',
ALTER COLUMN "priority" SET DEFAULT 'MOYENNE';
