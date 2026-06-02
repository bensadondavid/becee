import Link from "next/link";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/leads/StatusBadge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

type Lead = {
  id: string;
  contactName: string;
  companyName: string | null;
  status: string;
  createdAt: Date;
};

type RecentLeadsListProps = {
  leads: Lead[];
  title: string;
};

export default function RecentLeadsList({
  leads,
  title,
}: RecentLeadsListProps) {
  return (
    <Card className="p-5">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>

      <div className="space-y-2">
        {leads.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Aucun lead
          </p>
        )}

        {leads.map((lead) => (
          <Link
            key={lead.id}
            href={`/dashboard/leads/${lead.id}`}
            className="group flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                {lead.contactName}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {lead.companyName || "—"} ·{" "}
                {format(new Date(lead.createdAt), "d MMM yyyy", {
                  locale: fr,
                })}
              </p>
            </div>

            <StatusBadge status={lead.status} />
          </Link>
        ))}
      </div>
    </Card>
  );
}