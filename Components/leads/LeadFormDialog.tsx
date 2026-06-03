"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

const SOURCES = ["Facebook", "Google", "Recommandation", "Salon", "Instagram", "LinkedIn", "Site web", "Autre"];
const STATUSES = ["nouveau", "contacte", "qualifie", "proposition", "gagne", "perdu"];
const PRIORITIES = ["faible", "moyenne", "haute"];

type LeadForm = {
  contactName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  companyName: string;
  website: string;
  productType: string;
  estimatedBudget: string;
  potentialValue: string;
  source: string;
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
  country: "France",
  companyName: "",
  website: "",
  productType: "",
  estimatedBudget: "",
  potentialValue: "",
  source: "Site web",
  assignedTo: "",
  status: "nouveau",
  priority: "moyenne",
  notes: "",
};

export default function LeadFormDialog({
  open,
  onOpenChange,
}: LeadFormDialogProps) {
  const router = useRouter();
  const [form, setForm] = useState<LeadForm>(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof LeadForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm(defaultForm);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);

    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        estimatedBudget: form.estimatedBudget ? Number(form.estimatedBudget) : null,
        potentialValue: form.potentialValue ? Number(form.potentialValue) : null,
      }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      toast.error("Erreur lors de la création du lead");
      return;
    }

    toast.success("Lead créé avec succès");
    resetForm();
    onOpenChange(false);
    router.refresh();
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
              <Label>Pays</Label>
              <Input
                value={form.country}
                onChange={(e) => handleChange("country", e.target.value)}
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
              <Label>Budget estimé (€)</Label>
              <Input
                type="number"
                value={form.estimatedBudget}
                onChange={(e) => handleChange("estimatedBudget", e.target.value)}
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
              <Label>Source</Label>
              <Select
                value={form.source}
                onValueChange={(value) => handleChange("source", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOURCES.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    <SelectItem key={status} value={status}>
                      {status}
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
                    <SelectItem key={priority} value={priority}>
                      {priority}
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
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
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