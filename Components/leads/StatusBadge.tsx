import { Badge } from "@/components/ui/badge";

const statusConfig = {
  LEAD_FRAIS: {
    label: "Lead frais",
    className: "border-blue-200 bg-blue-100 text-blue-700",
  },
  A_RAPPELER: {
    label: "À rappeler",
    className: "border-amber-200 bg-amber-100 text-amber-700",
  },
  PAS_INTERESSE: {
    label: "Pas intéressé",
    className: "border-red-200 bg-red-100 text-red-700",
  },
  EN_ATTENTE: {
    label: "En attente",
    className: "border-slate-200 bg-slate-100 text-slate-700",
  },
  RDV: {
    label: "RDV",
    className: "border-violet-200 bg-violet-100 text-violet-700",
  },
  NRP_1: {
    label: "NRP 1",
    className: "border-orange-200 bg-orange-100 text-orange-700",
  },
  NRP_2: {
    label: "NRP 2",
    className: "border-orange-200 bg-orange-100 text-orange-700",
  },
  DEVIS_A_CREER: {
    label: "Devis à créer",
    className: "border-cyan-200 bg-cyan-100 text-cyan-700",
  },
  DEVIS_ENVOYE: {
    label: "Devis envoyé",
    className: "border-indigo-200 bg-indigo-100 text-indigo-700",
  },
  CONTRAT_SIGNE: {
    label: "Contrat signé",
    className: "border-emerald-200 bg-emerald-100 text-emerald-700",
  },
} as const;

const priorityConfig = {
  FAIBLE: {
    label: "Faible",
    className: "border-slate-200 bg-slate-100 text-slate-600",
  },
  MOYENNE: {
    label: "Moyenne",
    className: "border-orange-200 bg-orange-100 text-orange-600",
  },
  HAUTE: {
    label: "Haute",
    className: "border-red-200 bg-red-100 text-red-600",
  },
} as const;

export type LeadStatus = keyof typeof statusConfig;
export type LeadPriority = keyof typeof priorityConfig;

type StatusBadgeProps = {
  status: string;
};

type PriorityBadgeProps = {
  priority: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config =
    statusConfig[status as LeadStatus] ?? statusConfig.LEAD_FRAIS;

  return (
    <Badge
      variant="outline"
      className={`${config.className} text-xs font-medium`}
    >
      {config.label}
    </Badge>
  );
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config =
    priorityConfig[priority as LeadPriority] ?? priorityConfig.MOYENNE;

  return (
    <Badge
      variant="outline"
      className={`${config.className} text-xs font-medium`}
    >
      {config.label}
    </Badge>
  );
}