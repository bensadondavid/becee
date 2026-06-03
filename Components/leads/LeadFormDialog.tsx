"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";

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

type LeadForm = {
  contactName: string;
  email: string;
  phone: string;
  city: string;
  companyName: string;
  website: string;
  productType: string;
  potentialValue: string;
  assignedTo: string;
  status: string;
  priority: string;
  notes: string;
};

type LeadFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const defaultForm: LeadForm = {
  contactName: "",
  email: "",
  phone: "",
  city: "",
  companyName: "",
  website: "",
  productType: "",
  potentialValue: "",
  assignedTo: "",
  status: "LEAD_FRAIS",
  priority: "MOYENNE",
  notes: "",
};

export default function LeadFormDialog({
  open,
  onOpenChange,
}: LeadFormDialogProps) {
  const [form, setForm] = useState<LeadForm>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleChange = (field: keyof LeadForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(defaultForm);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const response = await fetch("/api/leads/newlead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        potentialValue: form.potentialValue
          ? Number(form.potentialValue)
          : null,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      toast.error("Erreur lors de la création du lead");
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["leads"],
    });

    toast.success("Lead créé avec succès");
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nouveau lead</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Nom du contact *</Label>
              <Input
                value={form.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label>Entreprise</Label>
              <Input
                value={form.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Téléphone</Label>
              <Input
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Ville</Label>
              <Input
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Site web</Label>
              <Input
                value={form.website}
                onChange={(e) => handleChange("website", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Type produit/service</Label>
              <Input
                value={form.productType}
                onChange={(e) => handleChange("productType", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Valeur potentielle (€)</Label>
              <Input
                type="number"
                value={form.potentialValue}
                onChange={(e) => handleChange("potentialValue", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Commercial assigné</Label>
              <Input
                value={form.assignedTo}
                onChange={(e) => handleChange("assignedTo", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Statut</Label>
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
            </div>

            <div className="space-y-1.5">
              <Label>Priorité</Label>
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
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer le lead"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
