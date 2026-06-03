import Link from "next/link";
import { Card } from "@/Components/ui/card";
import { PriorityBadge } from "@/Components/leads/StatusBadge";
import { format, isAfter, startOfToday } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarClock } from "lucide-react";

type Lead = {
  id: string;
  contactName: string;
  priority: string;
  status: string;
  nextFollowupDate: Date | null;
};

type UpcomingFollowupsProps = {
  leads: Lead[];
};

export default function UpcomingFollowups({
  leads,
}: UpcomingFollowupsProps) {
  const today = startOfToday();

  const upcoming = leads
    .filter(
      (lead) =>
        lead.nextFollowupDate &&
        lead.status !== "gagne" &&
        lead.status !== "perdu"
    )
    .sort(
      (a, b) =>
        new Date(a.nextFollowupDate!).getTime() -
        new Date(b.nextFollowupDate!).getTime()
    )
    .slice(0, 5);

  return (
    <Card className="p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <CalendarClock className="h-4 w-4 text-primary" />
        Prochains suivis
      </h3>

      <div className="space-y-2">
        {upcoming.length === 0 && (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Aucun suivi planifié
          </p>
        )}

        {upcoming.map((lead) => {
          const date = new Date(lead.nextFollowupDate!);

          const overdue = !isAfter(date, today);

          return (
            <Link
              key={lead.id}
              href={`/dashboard/leads/${lead.id}`}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {lead.contactName}
                </p>

                <p
                  className={`text-xs ${
                    overdue
                      ? "font-medium text-destructive"
                      : "text-muted-foreground"
                  }`}
                >
                  {format(date, "d MMM yyyy", { locale: fr })}
                  {overdue && " · En retard"}
                </p>
              </div>

              <PriorityBadge priority={lead.priority} />
            </Link>
          );
        })}
      </div>
    </Card>
  );
}