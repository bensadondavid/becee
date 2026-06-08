"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/Components/ui/table";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/Components/ui/select";
import { StatusBadge, PriorityBadge } from "@/Components/leads/StatusBadge";
import LeadFormDialog from "@/Components/leads/LeadFormDialog";
import { Plus, Search } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

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

const LEAD_STATUSES = STATUSES.filter((status) => status.value !== "tous");

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
  createdAt: string;
  status: string;
  priority: string;
  source: string | null;
  phone: string | null;
  email: string | null;
};

type FetchLeadsParams = {
  page: number;
  search: string;
  status: string;
  priority: string;
};

type LeadsResponse = {
  data: Lead[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

async function fetchLeads({
  page,
  search,
  status,
  priority,
}: FetchLeadsParams): Promise<LeadsResponse> {
  const params = new URLSearchParams();

  params.set("page", page.toString());

  if (search) params.set("search", search);
  if (status && status !== "tous") params.set("status", status);
  if (priority && priority !== "toutes") params.set("priority", priority);

  const response = await fetch(`/api/leads?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Impossible de récupérer les leads");
  }

  return response.json();
}

export default function LeadsListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "tous";
  const priority = searchParams.get("priority") ?? "toutes";

  const { data,isLoading,isError } = useQuery({
    queryKey: ["leads", page, search, status, priority],
    queryFn: () =>
      fetchLeads({
        page,
        search,
        status,
        priority,
      }),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  const leads = data?.data ?? [];
  const pagination = data?.pagination;

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    const response = await fetch(`/api/leads/modifiedLead/${leadId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      toast.error("Erreur lors de la mise à jour du statut");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["leads"] });
    toast.success("Statut mis à jour");
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "tous" || value === "toutes" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    const queryString = params.toString();
    router.push(
      queryString ? `/dashboard/leads?${queryString}` : "/dashboard/leads",
    );
  };

  const updatePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", nextPage.toString());
    }

    const queryString = params.toString();
    router.push(
      queryString ? `/dashboard/leads?${queryString}` : "/dashboard/leads",
    );
  };

  const paginationItems = pagination
    ? Array.from({ length: pagination.totalPages }, (_, index) => index + 1).filter(
        (pageNumber) =>
          pageNumber === 1 ||
          pageNumber === pagination.totalPages ||
          Math.abs(pageNumber - pagination.page) <= 2,
      )
    : [];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isLoading
              ? "Chargement des leads..."
              : pagination
                ? `${leads.length} lead${leads.length > 1 ? "s" : ""} affiché${
                    leads.length > 1 ? "s" : ""
                  } sur ${pagination.total}`
                : `${leads.length} lead${leads.length > 1 ? "s" : ""} affiché${
                    leads.length > 1 ? "s" : ""
                  }`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau lead
          </Button>
        </div>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            disabled={!pagination.hasPreviousPage || isLoading}
            onClick={() => updatePage(pagination.page - 1)}
          >
            Précédent
          </Button>

          {paginationItems.map((pageNumber, index) => {
            const previousPageNumber = paginationItems[index - 1];
            const shouldShowEllipsis =
              previousPageNumber && pageNumber - previousPageNumber > 1;

            return (
              <div key={pageNumber} className="flex items-center gap-2">
                {shouldShowEllipsis && (
                  <span className="px-1 text-sm text-muted-foreground">...</span>
                )}

                <Button
                  variant={
                    pageNumber === pagination.page ? "default" : "outline"
                  }
                  disabled={isLoading || pageNumber === pagination.page}
                  onClick={() => updatePage(pageNumber)}
                  className="h-9 min-w-9 px-3"
                >
                  {pageNumber}
                </Button>
              </div>
            );
          })}

          <Button
            variant="outline"
            disabled={!pagination.hasNextPage || isLoading}
            onClick={() => updatePage(pagination.page + 1)}
          >
            Suivant
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {pagination.page} / {pagination.totalPages}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-[200px] max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            defaultValue={search}
            onBlur={(event) => {
              updateFilter("search", event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateFilter("search", event.currentTarget.value);
              }
            }}
            className="pl-9"
          />
        </div>

        <Select
          value={status}
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
          value={priority}
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
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-muted-foreground"
                >
                  Chargement...
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-destructive"
                >
                  Impossible de charger les leads
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && leads.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="py-12 text-center text-muted-foreground"
                >
                  Aucun lead trouvé
                </TableCell>
              </TableRow>
            )}

            {!isLoading &&
              !isError &&
              leads.map((lead) => (
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

                  <TableCell onClick={(event) => event.stopPropagation()}>
                    <Select
                      value={lead.status}
                      onValueChange={(value) =>
                        handleStatusChange(lead.id, value)
                      }
                    >
                      <SelectTrigger className="h-8 w-auto border-none bg-transparent p-0 shadow-none [&>svg]:ml-1.5">
                        <SelectValue>
                          <StatusBadge status={lead.status} />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {LEAD_STATUSES.map((leadStatus) => (
                          <SelectItem
                            key={leadStatus.value}
                            value={leadStatus.value}
                          >
                            {leadStatus.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-end gap-2">
          <Button
            variant="outline"
            disabled={!pagination.hasPreviousPage || isLoading}
            onClick={() => updatePage(pagination.page - 1)}
          >
            Précédent
          </Button>

          {paginationItems.map((pageNumber, index) => {
            const previousPageNumber = paginationItems[index - 1];
            const shouldShowEllipsis =
              previousPageNumber && pageNumber - previousPageNumber > 1;

            return (
              <div key={pageNumber} className="flex items-center gap-2">
                {shouldShowEllipsis && (
                  <span className="px-1 text-sm text-muted-foreground">...</span>
                )}

                <Button
                  variant={
                    pageNumber === pagination.page ? "default" : "outline"
                  }
                  disabled={isLoading || pageNumber === pagination.page}
                  onClick={() => updatePage(pageNumber)}
                  className="h-9 min-w-9 px-3"
                >
                  {pageNumber}
                </Button>
              </div>
            );
          })}

          <Button
            variant="outline"
            disabled={!pagination.hasNextPage || isLoading}
            onClick={() => updatePage(pagination.page + 1)}
          >
            Suivant
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {pagination.page} / {pagination.totalPages}
          </span>
        </div>
      )}

      <LeadFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
