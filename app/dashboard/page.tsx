import { prisma } from "@/lib/database/prisma";
import { Users, UserPlus, TrendingUp, DollarSign } from "lucide-react";
import { startOfMonth, isAfter } from "date-fns";

import KpiCard from "@/Components/dashboard/KpiCard";
import StatusChart from "@/Components/dashboard/StatusChart";
import RecentLeadsList from "@/Components/dashboard/RecentLeadsList";
import UpcomingFollowups from "@/Components/dashboard/UpcomingFollowups";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // auth

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const monthStart = startOfMonth(new Date());

  const newThisMonth = leads.filter((lead) => {
    return isAfter(new Date(lead.createdAt), monthStart);
  }).length;

  const wonCount = leads.filter((lead) => {
    return lead.status === "CONTRAT_SIGNE";
  }).length;

  const pipelineValue = leads
    .filter((lead) => {
      return lead.status !== "PAS_INTERESSE" && lead.status !== "CONTRAT_SIGNE";
    })
    .reduce((sum, lead) => {
      return sum + (lead.potentialValue || lead.estimatedBudget || 0);
    }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vue d&apos;ensemble de votre activité commerciale
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Total leads" value={leads.length} icon={Users} />

        <KpiCard
          title="Leads créés ce mois"
          value={newThisMonth}
          icon={UserPlus}
        />

        <KpiCard title="Contrats signés" value={wonCount} icon={TrendingUp} />

        <KpiCard
          title="Valeur pipeline"
          value={`${pipelineValue.toLocaleString("fr-FR")} €`}
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <StatusChart leads={leads} />
        <UpcomingFollowups leads={leads} />
      </div>

      <RecentLeadsList
        leads={leads.slice(0, 5)}
        title="5 derniers leads ajoutés"
      />
    </div>
  );
}
