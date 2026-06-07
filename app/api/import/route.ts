import { NextResponse, NextRequest } from "next/server";
import Papa from "papaparse";
import { prisma } from "@/lib/database/prisma";

export async function POST(req: NextRequest) {
  try {
    // On recupere l'url et sort l'id
    
    const { sheetsUrl } = await req.json();
    if (!sheetsUrl || typeof sheetsUrl !== "string") {
      return NextResponse.json({ error: "URL manquante" }, { status: 400 });
    }
    const match = sheetsUrl.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (!match) {
      return NextResponse.json({ error: "URL Invalide" }, { status: 400 });
    }
    const sheetId = match[1];

    // On construit l'url csv pour exporter au format recuperable
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;

    // On recupere le fichier csv
    const response = await fetch(csvUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Impossible de lire le Fichier CSV" },
        { status: 400 },
      );
    }
    const csv = await response.text();

    const parsed = Papa.parse<Record<string, string>>(csv, {
      header: true,
      skipEmptyLines: true,
    });
    const rows = parsed.data;

    const leads = rows.map((row)=>(
      {
        contactName : row['contactName'],
        companyName : row['companyName'],
        category: row['category'],
        email: row['email'] ,
        phone : row['phone'],
        city : row['city'],
        country : row['country'] || 'France',
        website : row['website'] || ''
      }
    )).filter((lead)=>  lead.phone && (lead.companyName || lead.contactName))

    await prisma.lead.createMany({
      data: leads
    })

    return NextResponse.json({message : 'Leads créés', import : leads.length}, {status: 201})

  } catch {
    return NextResponse.json({error: 'Internal server error'}, {status: 500})
  }
}
