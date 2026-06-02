"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card } from "@/components/ui/card";

const statusLabels = {
  LEAD_FRAIS: "Lead frais",
  A_RAPPELER: "À rappeler",
  PAS_INTERESSE: "Pas intéressé",
  EN_ATTENTE: "En attente",
  RDV: "RDV",
  NRP_1: "NRP 1",
  NRP_2: "NRP 2",
  DEVIS_A_CREER: "Devis à créer",
  DEVIS_ENVOYE: "Devis envoyé",
  CONTRAT_SIGNE: "Contrat signé",
} as const;

const statusColors = {
  LEAD_FRAIS: "#3b82f6",
  A_RAPPELER: "#f59e0b",
  PAS_INTERESSE: "#ef4444",
  EN_ATTENTE: "#64748b",
  RDV: "#8b5cf6",
  NRP_1: "#f97316",
  NRP_2: "#ea580c",
  DEVIS_A_CREER: "#06b6d4",
  DEVIS_ENVOYE: "#6366f1",
  CONTRAT_SIGNE: "#10b981",
} as const;

type LeadStatus = keyof typeof statusLabels;

type Lead = {
  status: string;
};

type StatusChartProps = {
  leads: Lead[];
};

export default function StatusChart({ leads }: StatusChartProps) {
  const data = Object.entries(statusLabels).map(([key, label]) => {
    const status = key as LeadStatus;

    return {
      name: label,
      status,
      count: leads.filter((lead) => lead.status === status).length,
      fill: statusColors[status],
    };
  });

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-semibold">Leads par statut</h3>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={32}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(220 13% 91%)"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid hsl(220 13% 91%)",
                fontSize: 13,
              }}
            />

            <Bar dataKey="count" name="Leads" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}