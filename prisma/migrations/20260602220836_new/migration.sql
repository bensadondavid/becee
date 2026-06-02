/*
  Warnings:

  - The values [NOUVEAU,QUALIFIE,NRP,ANNULE] on the enum `LeadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LeadStatus_new" AS ENUM ('LEAD_FRAIS', 'A_RAPPELER', 'PAS_INTERESSE', 'EN_ATTENTE', 'RDV', 'NRP_1', 'NRP_2', 'DEVIS_A_CREER', 'DEVIS_ENVOYE', 'CONTRAT_SIGNE');
ALTER TABLE "public"."Lead" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Lead" ALTER COLUMN "status" TYPE "LeadStatus_new" USING ("status"::text::"LeadStatus_new");
ALTER TYPE "LeadStatus" RENAME TO "LeadStatus_old";
ALTER TYPE "LeadStatus_new" RENAME TO "LeadStatus";
DROP TYPE "public"."LeadStatus_old";
ALTER TABLE "Lead" ALTER COLUMN "status" SET DEFAULT 'LEAD_FRAIS';
COMMIT;

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "status" SET DEFAULT 'LEAD_FRAIS';
