-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('nouveau', 'contacte', 'qualifie', 'proposition', 'gagne', 'perdu');

-- CreateEnum
CREATE TYPE "LeadPriority" AS ENUM ('faible', 'moyenne', 'haute');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "companyName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "city" TEXT,
    "country" TEXT,
    "website" TEXT,
    "productType" TEXT,
    "estimatedBudget" DOUBLE PRECISION,
    "potentialValue" DOUBLE PRECISION,
    "source" TEXT,
    "assignedTo" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'nouveau',
    "priority" "LeadPriority" NOT NULL DEFAULT 'moyenne',
    "lastContactDate" TIMESTAMP(3),
    "nextFollowupDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_priority_idx" ON "Lead"("priority");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "Lead_nextFollowupDate_idx" ON "Lead"("nextFollowupDate");
