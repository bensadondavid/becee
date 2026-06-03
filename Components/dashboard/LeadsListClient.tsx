"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { StatusBadge, PriorityBadge } from "@/Components/leads/StatusBadge";
import LeadFormDialog from "@/Components/leads/LeadFormDialog";
import { Plus, Search } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const STATUSES = [
  { value: "tous", label: "Tous" },
  { value: "LEAD_FRAIS", label: "Lead frais" },
  { value: "A_RAPPELER", label: "À rappeler" },
  { value: "PAS_INTERESSE", label: "Pas intéressé" },
  { value: "EN_ATTENTE", label: "En attente" },
  { value: "RDV", label: "RDV" },
  { value: "NRP_1", label: "NRP 1" },
  { value: "NRP_2", label: "NRP 2" },
  { value: "DEVIS_A_CREER", label: "Devis à créer" },
  { value: "DEVIS_ENVOYE", label: "Devis envoyé" },
  { value: "CONTRAT_SIGNE", label: "Contrat signé" },
];

const PRIORITIES = [
  { value: "toutes", label: "Toutes" },
  { value: "FAIBLE", label: "Faible" },
  { value: "MOYENNE", label: "Moyenne" },
  { value: "HAUTE", label: "Haute" },
];

type Lead = {
  id: string;
  contactName: string;
  companyName: string | null;
  productType: string | null;
  createdAt: Date;
  status: string;
  priority: string;
  source: string | null;
  phone: string | null;
  email: string | null;
};

export default function LeadsListClient({ leads }: { leads: Lead[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dialogOpen, setDialogOpen] = useState(false);


  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "tous" || value === "toutes" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    router.push(`/dashboard/leads?${params.toString()}`);
  };

  
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {leads.length} lead{leads.length > 1 ? "s" : ""} au total
          </p>
        </div>

        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau lead
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[200px] max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            defaultValue={searchParams.get("search") ?? ""}
            onBlur={(event) => {
              updateFilter("search", event.target.value);
            }}
            className="pl-9"
          />
        </div>

        <Select
          value={searchParams.get("status") ?? "tous"}
          onValueChange={(value) => updateFilter("status", value)}
        >
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("priority") ?? "toutes"}
          onValueChange={(value) => updateFilter("priority", value)}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PRIORITIES.map((priority) => (
              <SelectItem key={priority.value} value={priority.value}>
                {priority.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Entreprise</TableHead>
              <TableHead>Type produit</TableHead>
              <TableHead>Date d'entrée</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leads.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-muted-foreground"
                >
                  Aucun lead trouvé
                </TableCell>
              </TableRow>
            )}

            {leads.map((lead) => (
              <TableRow
                key={lead.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => router.push(`/dashboard/leads/${lead.id}`)}
              >
                <TableCell className="font-medium">
                  {lead.contactName}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {lead.companyName || "—"}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {lead.productType || "—"}
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {format(new Date(lead.createdAt), "d MMM yy", {
                    locale: fr,
                  })}
                </TableCell>

                <TableCell>
                  <StatusBadge status={lead.status} />
                </TableCell>

                <TableCell>
                  <PriorityBadge priority={lead.priority} />
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {lead.phone || "—"}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {lead.email || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <LeadFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}