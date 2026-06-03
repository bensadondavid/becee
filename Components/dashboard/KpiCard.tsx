import { Card } from "@/Components/ui/card";
import type { LucideIcon } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
};

export default function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: KpiCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>

          {subtitle && (
            <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {Icon && (
          <div className="rounded-lg bg-primary/10 p-2.5">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </Card>
  );
}
