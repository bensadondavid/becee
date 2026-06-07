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

  const previousLead = await prisma.lead.findFirst({
  where: {
    OR: [
      {
        createdAt: {
          gt: lead.createdAt,
        },
      },
      {
        createdAt: lead.createdAt,
        id: {
          gt: lead.id,
        },
      },
    ],
  },
  orderBy: [
    { createdAt: "asc" },
    { id: "asc" },
  ],
  select: {
    id: true,
  },
});

const nextLead = await prisma.lead.findFirst({
  where: {
    OR: [
      {
        createdAt: {
          lt: lead.createdAt,
        },
      },
      {
        createdAt: lead.createdAt,
        id: {
          lt: lead.id,
        },
      },
    ],
  },
  orderBy: [
    { createdAt: "desc" },
    { id: "desc" },
  ],
  select: {
    id: true,
  },
});

  return (
    <LeadDetailClient
      lead={lead}
      previousLeadHref={
        previousLead ? `/dashboard/leads/${previousLead.id}` : null
      }
      nextLeadHref={nextLead ? `/dashboard/leads/${nextLead.id}` : null}
    />
  );
}
