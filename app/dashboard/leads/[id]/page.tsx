import { notFound } from "next/navigation";
import { prisma } from "@/lib/database/prisma";
import LeadDetailClient from "@/components/leads/LeadDetailClient";

type LeadPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadPage({ params }: LeadPageProps) {
  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
  });

  if (!lead) {
    notFound();
  }

  return <LeadDetailClient lead={lead} />;
}