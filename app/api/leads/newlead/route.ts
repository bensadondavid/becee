import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { LeadPriority, LeadStatus } from "@/lib/database/prisma/enums";

type LeadForm = {
  contactName: string;
  email?: string;
  phone?: string;
  city?: string;
  companyName?: string;
  website?: string;
  productType?: string;
  potentialValue?: string;
  assignedTo?: string;
  status?: LeadStatus;
  priority?: LeadPriority;
  notes?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body: LeadForm = await req.json();

    const {
      contactName,
      email,
      phone,
      city,
      companyName,
      website,
      productType,
      potentialValue,
      assignedTo,
      status,
      priority,
      notes,
    } = body;

    if (!contactName) {
      return NextResponse.json(
        { error: "Le nom du contact est obligatoire" },
        { status: 400 }
      );
    }

    const newLead = await prisma.lead.create({
      data: {
        contactName,
        email: email || null,
        phone: phone || null,
        city: city || null,
        companyName: companyName || null,
        website: website || null,
        productType: productType || null,
        potentialValue: potentialValue ? Number(potentialValue) : null,
        assignedTo: assignedTo || null,
        status: status || "LEAD_FRAIS",
        priority: priority || "MOYENNE",
        notes: notes || null,
      },
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Impossible de créer le lead" },
      { status: 500 }
    );
  }
}