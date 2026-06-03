import { notFound } from "next/navigation";
import { prisma } from "@/lib/database/prisma";
import LeadDetailClient from "@/Components/leads/LeadDetailClient";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

type LeadPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LeadPage({ params }: LeadPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
  });

  if (!lead) {
    notFound();
  }

  return <LeadDetailClient lead={lead} />;
}
