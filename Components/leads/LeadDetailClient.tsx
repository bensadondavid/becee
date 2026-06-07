"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { StatusBadge, PriorityBadge } from "@/Components/leads/StatusBadge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { ArrowLeft, Pencil, Trash2, Phone, Save, X } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

const STATUSES = [
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
  { value: "FAIBLE", label: "Faible" },
  { value: "MOYENNE", label: "Moyenne" },
  { value: "HAUTE", label: "Haute" },
];

type Lead = {
  id: string;
  contactName: string;
  companyName: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  website: string | null;
  productType: string | null;
  potentialValue: number | null;
  assignedTo: string | null;
  status: string;
  priority: string;
  lastContactDate: Date | null;
  nextFollowupDate: Date | null;
  notes: string | null;
  createdAt: Date;
};

type LeadForm = {
  contactName: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  website: string;
  productType: string;
  potentialValue: string;
  assignedTo: string;
  status: string;
  priority: string;
  lastContactDate: string;
  nextFollowupDate: string;
  notes: string;
};

function toDateInputValue(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
}

function formatMoney(value: number | null) {
  if (!value) return "—";
  return `${value.toLocaleString("fr-FR")} €`;
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-3 items-center gap-4 border-b border-border py-2.5 last:border-0">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      <div className="col-span-2">{children}</div>
    </div>
  );
}

export default function LeadDetailClient({ lead }: { lead: Lead }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<LeadForm>({
    contactName: lead.contactName,
    companyName: lead.companyName || "",
    phone: lead.phone || "",
    email: lead.email || "",
    city: lead.city || "",
    website: lead.website || "",
    productType: lead.productType || "",
    potentialValue: lead.potentialValue?.toString() || "",
    assignedTo: lead.assignedTo || "",
    status: lead.status,
    priority: lead.priority,
    lastContactDate: toDateInputValue(lead.lastContactDate),
    nextFollowupDate: toDateInputValue(lead.nextFollowupDate),
    notes: lead.notes || "",
  });

  const handleChange = (field: keyof LeadForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const response = await fetch(`/api/leads/modifiedLead/${lead.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        potentialValue: form.potentialValue
          ? Number(form.potentialValue)
          : null,
        lastContactDate: form.lastContactDate || null,
        nextFollowupDate: form.nextFollowupDate || null,
      }),
    });

    if (!response.ok) {
      toast.error("Erreur lors de la mise à jour");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["leads"] });

    toast.success("Lead mis à jour");
    setEditing(false);
    router.refresh();
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/leads/modifiedLead/${lead.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Erreur lors de la suppression");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["leads"] });

    toast.success("Lead supprimé");
    router.push("/dashboard/leads");
    router.refresh();
  };

  const markAsContacted = async () => {
    const response = await fetch(`/api/leads/modifiedLead/${lead.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "A_RAPPELER",
        lastContactDate: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      toast.error("Erreur lors de la mise à jour");
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ["leads"] });

    toast.success("Lead marqué comme contacté");
    router.refresh();
  };

  return (
    <div className="max-w-4xl space-y-6 m-auto">
      <button
        onClick={() => router.push("/dashboard/leads")}
        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux leads
      </button>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {lead.contactName}
          </h1>
          <p className="mt-0.5 text-muted-foreground">
            {lead.companyName || "Pas d'entreprise"}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <StatusBadge status={lead.status} />
            <PriorityBadge priority={lead.priority} />

            {lead.potentialValue && lead.potentialValue > 0 && (
              <span className="text-sm font-semibold text-primary">
                {lead.potentialValue.toLocaleString("fr-FR")} €
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {!editing ? (
            <>
              {lead.status === "LEAD_FRAIS" && (
                <Button variant="outline" size="sm" onClick={markAsContacted}>
                  <Phone className="mr-1.5 h-4 w-4" />
                  Marquer contacté
                </Button>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(true)}
              >
                <Pencil className="mr-1.5 h-4 w-4" />
                Modifier
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer ce lead ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(false)}
              >
                <X className="mr-1.5 h-4 w-4" />
                Annuler
              </Button>

              <Button size="sm" onClick={handleSave}>
                <Save className="mr-1.5 h-4 w-4" />
                Enregistrer
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Contact</h3>

          <FieldRow label="Nom">
            {editing ? (
              <Input
                value={form.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
              />
            ) : (
              <span className="text-sm">{lead.contactName}</span>
            )}
          </FieldRow>

          <FieldRow label="Téléphone">
            {editing ? (
              <Input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            ) : (
              <span className="text-sm">{lead.phone || "—"}</span>
            )}
          </FieldRow>

          <FieldRow label="Email">
            {editing ? (
              <Input
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            ) : (
              <span className="text-sm">{lead.email || "—"}</span>
            )}
          </FieldRow>

          <FieldRow label="Ville">
            {editing ? (
              <Input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            ) : (
              <span className="text-sm">{lead.city || "—"}</span>
            )}
          </FieldRow>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Entreprise</h3>

          <FieldRow label="Nom">
            {editing ? (
              <Input
                value={form.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            ) : (
              <span className="text-sm">{lead.companyName || "—"}</span>
            )}
          </FieldRow>

          <FieldRow label="Site web">
            {editing ? (
              <Input
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            ) : lead.website ? (
              <a
                href={lead.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                {lead.website}
              </a>
            ) : (
              <span className="text-sm">—</span>
            )}
          </FieldRow>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Projet</h3>

          <FieldRow label="Type produit">
            {editing ? (
              <Input
                value={form.productType}
                onChange={(e) => handleChange("productType", e.target.value)}
              />
            ) : (
              <span className="text-sm">{lead.productType || "—"}</span>
            )}
          </FieldRow>

          <FieldRow label="Valeur potentielle">
            {editing ? (
              <Input
                type="number"
                value={form.potentialValue}
                onChange={(e) => handleChange("potentialValue", e.target.value)}
              />
            ) : (
              <span className="text-sm">
                {formatMoney(lead.potentialValue)}
              </span>
            )}
          </FieldRow>
        </Card>

        <Card className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Suivi</h3>

          <FieldRow label="Commercial">
            {editing ? (
              <Input
                value={form.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
              />
            ) : (
              <span className="text-sm">{lead.assignedTo || "—"}</span>
            )}
          </FieldRow>

          <FieldRow label="Statut">
            {editing ? (
              <Select
                value={form.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger>
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
            ) : (
              <StatusBadge status={lead.status} />
            )}
          </FieldRow>

          <FieldRow label="Priorité">
            {editing ? (
              <Select
                value={form.priority}
                onValueChange={(value) => handleChange("priority", value)}
              >
                <SelectTrigger>
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
            ) : (
              <PriorityBadge priority={lead.priority} />
            )}
          </FieldRow>

          <FieldRow label="Dernier contact">
            {editing ? (
              <Input
                type="date"
                value={form.lastContactDate}
                onChange={(e) =>
                  handleChange("lastContactDate", e.target.value)
                }
              />
            ) : (
              <span className="text-sm">
                {lead.lastContactDate
                  ? format(new Date(lead.lastContactDate), "d MMM yyyy", {
                      locale: fr,
                    })
                  : "—"}
              </span>
            )}
          </FieldRow>

          <FieldRow label="Prochain suivi">
            {editing ? (
              <Input
                type="date"
                value={form.nextFollowupDate}
                onChange={(e) =>
                  handleChange("nextFollowupDate", e.target.value)
                }
              />
            ) : (
              <span className="text-sm">
                {lead.nextFollowupDate
                  ? format(new Date(lead.nextFollowupDate), "d MMM yyyy", {
                      locale: fr,
                    })
                  : "—"}
              </span>
            )}
          </FieldRow>

          <FieldRow label="Date entrée">
            <span className="text-sm">
              {format(new Date(lead.createdAt), "d MMM yyyy", { locale: fr })}
            </span>
          </FieldRow>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-3 text-sm font-semibold">Notes</h3>

        {editing ? (
          <Textarea
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            rows={5}
            placeholder="Ajouter des notes..."
          />
        ) : (
          <p className="whitespace-pre-wrap text-sm text-muted-foreground">
            {lead.notes || "Aucune note"}
          </p>
        )}
      </Card>
    </div>
  );
}
