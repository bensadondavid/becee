"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Card } from "@/Components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import {
  Upload,
  FileSpreadsheet,
  Globe,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const LEAD_FIELDS = [
  { key: "contactName", label: "Nom du contact" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Téléphone" },
  { key: "companyName", label: "Entreprise" },
  { key: "city", label: "Ville" },
  { key: "country", label: "Pays" },
  { key: "website", label: "Site web" },
  { key: "productType", label: "Type produit" },
  { key: "estimatedBudget", label: "Budget estimé" },
  { key: "potentialValue", label: "Valeur potentielle" },
  { key: "source", label: "Source" },
  { key: "assignedTo", label: "Commercial" },
  { key: "status", label: "Statut" },
  { key: "priority", label: "Priorité" },
  { key: "notes", label: "Notes" },
  { key: "__ignore__", label: "— Ignorer —" },
] as const;

type LeadFieldKey = (typeof LEAD_FIELDS)[number]["key"];

type CsvRow = Record<string, string>;

type CsvData = {
  headers: string[];
  rows: CsvRow[];
};

type LeadImportPayload = {
  contactName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  city?: string;
  country?: string;
  website?: string;
  productType?: string;
  estimatedBudget?: number;
  potentialValue?: number;
  source?: string;
  assignedTo?: string;
  status?: string;
  priority?: string;
  notes?: string;
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[_\s-]/g, "");
}

function parseCSV(text: string): CsvData {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  const separator = lines[0].includes(";") ? ";" : ",";

  const headers = lines[0]
    .split(separator)
    .map((header) => header.replace(/^"|"$/g, "").trim());

  const rows = lines.slice(1).map((line) => {
    const values = line
      .split(separator)
      .map((value) => value.replace(/^"|"$/g, "").trim());

    const row: CsvRow = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });

    return row;
  });

  return { headers, rows };
}

function MappingStep({
  headers,
  rows,
  onImport,
  isImporting,
}: {
  headers: string[];
  rows: CsvRow[];
  onImport: (leads: LeadImportPayload[]) => void;
  isImporting: boolean;
}) {
  const [mapping, setMapping] = useState<Record<string, LeadFieldKey>>(() => {
    const initialMapping: Record<string, LeadFieldKey> = {};

    headers.forEach((header) => {
      const normalizedHeader = normalize(header);

      const match = LEAD_FIELDS.find((field) => {
        const normalizedLabel = normalize(field.label);
        const normalizedKey = normalize(field.key);

        return (
          normalizedLabel === normalizedHeader ||
          normalizedKey === normalizedHeader ||
          normalizedHeader.includes(normalizedKey) ||
          normalizedKey.includes(normalizedHeader)
        );
      });

      initialMapping[header] = match ? match.key : "__ignore__";
    });

    return initialMapping;
  });

  const handleImport = () => {
    const leads = rows
      .map((row) => {
        const lead: LeadImportPayload = {};

        Object.entries(mapping).forEach(([csvColumn, leadField]) => {
          const value = row[csvColumn];

          if (!value || leadField === "__ignore__") {
            return;
          }

          if (
            leadField === "estimatedBudget" ||
            leadField === "potentialValue"
          ) {
            lead[leadField] = Number(value) || undefined;
            return;
          }

          lead[leadField] = value;
        });

        return lead;
      })
      .filter((lead) => lead.contactName);

    onImport(leads);
  };

  const preview = rows.slice(0, 5);

  const contactNameColumn = Object.entries(mapping).find(
    ([, value]) => value === "contactName",
  )?.[0];

  const importableCount = contactNameColumn
    ? rows.filter((row) => row[contactNameColumn]).length
    : 0;

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold">Mapping des colonnes</h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {headers.map((header) => (
            <div key={header} className="flex items-center gap-3">
              <span className="min-w-[120px] truncate text-sm text-muted-foreground">
                {header}
              </span>

              <Select
                value={mapping[header]}
                onValueChange={(value) =>
                  setMapping((prev) => ({
                    ...prev,
                    [header]: value as LeadFieldKey,
                  }))
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {LEAD_FIELDS.map((field) => (
                    <SelectItem key={field.key} value={field.key}>
                      {field.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="mb-3 text-sm font-semibold">
          Aperçu — 5 premières lignes
        </h3>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header} className="text-xs">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {preview.map((row, index) => (
                <TableRow key={index}>
                  {headers.map((header) => (
                    <TableCell key={header} className="text-xs">
                      {row[header] || "—"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Button onClick={handleImport} disabled={isImporting} className="w-full">
        {isImporting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle className="mr-2 h-4 w-4" />
        )}
        Importer {importableCount} leads
      </Button>
    </div>
  );
}

export default function ImportLeadsClient() {
  const router = useRouter();

  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [sheetsUrl, setSheetsUrl] = useState("");
  const [fetchingSheet, setFetchingSheet] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const importLeads = async (leads: LeadImportPayload[]) => {
    setIsImporting(true);

    const response = await fetch("/api/leads/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ leads }),
    });

    setIsImporting(false);

    if (!response.ok) {
      toast.error("Erreur lors de l'import");
      return;
    }

    toast.success(`${leads.length} lead(s) importé(s) avec succès`);
    setCsvData(null);
    router.refresh();
  };

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const text = String(readerEvent.target?.result || "");
        setCsvData(parseCSV(text));
      };

      reader.readAsText(file);
    },
    [],
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer?.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const text = String(readerEvent.target?.result || "");
      setCsvData(parseCSV(text));
    };

    reader.readAsText(file);
  }, []);

  const fetchGoogleSheet = async () => {
    if (!sheetsUrl) return;

    setFetchingSheet(true);

    try {
      let csvUrl = sheetsUrl;

      const match = sheetsUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);

      if (match) {
        csvUrl = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
      }

      const response = await fetch(csvUrl);
      const text = await response.text();

      setCsvData(parseCSV(text));
    } catch {
      toast.error("Impossible de récupérer la feuille Google Sheets");
    } finally {
      setFetchingSheet(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Import de leads</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Importez vos leads depuis un fichier CSV ou Google Sheets
        </p>
      </div>

      {!csvData ? (
        <Tabs defaultValue="csv">
          <TabsList>
            <TabsTrigger value="csv" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Fichier CSV
            </TabsTrigger>

            <TabsTrigger value="sheets" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Google Sheets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="csv">
            <Card
              className="flex cursor-pointer flex-col items-center gap-4 border-2 border-dashed p-10 transition-colors hover:border-primary/50"
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
              onClick={() => document.getElementById("csv-input")?.click()}
            >
              <Upload className="h-10 w-10 text-muted-foreground" />

              <div className="text-center">
                <p className="text-sm font-medium">
                  Glissez-déposez votre fichier CSV ici
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  ou cliquez pour sélectionner
                </p>
              </div>

              <input
                id="csv-input"
                type="file"
                accept=".csv,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </Card>
          </TabsContent>

          <TabsContent value="sheets">
            <Card className="space-y-4 p-6">
              <div className="space-y-1.5">
                <Label>URL de la feuille Google Sheets</Label>

                <p className="text-xs text-muted-foreground">
                  Fichier → Publier sur le web → Format CSV, puis collez
                  l&apos;URL ici
                </p>

                <Input
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  value={sheetsUrl}
                  onChange={(event) => setSheetsUrl(event.target.value)}
                />
              </div>

              <Button
                onClick={fetchGoogleSheet}
                disabled={fetchingSheet || !sheetsUrl}
              >
                {fetchingSheet ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Globe className="mr-2 h-4 w-4" />
                )}
                Récupérer
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {csvData.rows.length} ligne(s) détectée(s) ·{" "}
              {csvData.headers.length} colonne(s)
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCsvData(null)}
            >
              Changer de fichier
            </Button>
          </div>

          <MappingStep
            headers={csvData.headers}
            rows={csvData.rows}
            onImport={importLeads}
            isImporting={isImporting}
          />
        </div>
      )}
    </div>
  );
}
