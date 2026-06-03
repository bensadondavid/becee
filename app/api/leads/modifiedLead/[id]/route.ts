import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";
import { LeadPriority, LeadStatus } from "@/lib/database/prisma/enums";

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
  status: LeadStatus;
  priority: LeadPriority;
  lastContactDate: string;
  nextFollowupDate: string;
  notes: string;
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: Partial<LeadForm> = await req.json();

    const modifiedLead = await prisma.lead.update({
      where: {
        id,
      },
      data: {
        ...(body.contactName !== undefined && { contactName: body.contactName }),
        ...(body.email !== undefined && { email: body.email || null }),
        ...(body.phone !== undefined && { phone: body.phone || null }),
        ...(body.city !== undefined && { city: body.city || null }),
        ...(body.companyName !== undefined && {
          companyName: body.companyName || null,
        }),
        ...(body.website !== undefined && { website: body.website || null }),
        ...(body.productType !== undefined && {
          productType: body.productType || null,
        }),
        ...(body.potentialValue !== undefined && {
          potentialValue: body.potentialValue ? Number(body.potentialValue) : null,
        }),
        ...(body.assignedTo !== undefined && { assignedTo: body.assignedTo || null }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.priority !== undefined && { priority: body.priority }),
        ...(body.notes !== undefined && { notes: body.notes || null }),
        ...(body.lastContactDate !== undefined && {
          lastContactDate: body.lastContactDate ? new Date(body.lastContactDate) : null,
        }),
        ...(body.nextFollowupDate !== undefined && {
          nextFollowupDate: body.nextFollowupDate
            ? new Date(body.nextFollowupDate)
            : null,
        }),
      },
    });

    return NextResponse.json(modifiedLead);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Impossible de modifier le lead" },
      { status: 500 }
    );
  }
}

export async function DELETE( req: NextRequest, { params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  await prisma.lead.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
  });

}