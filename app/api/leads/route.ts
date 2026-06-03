import { prisma } from "@/lib/database/prisma";
import { LeadStatus, LeadPriority } from "@/lib/database/prisma/enums";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const PAGE_SIZE = 50;

  const leads = await prisma.lead.findMany({
    where: {
      ...(status &&
        status !== "tous" && {
          status: status as LeadStatus,
        }),

      ...(priority &&
        priority !== "toutes" && {
          priority: priority as LeadPriority,
        }),

      ...(search && {
        OR: [
          {
            contactName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            companyName: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  return NextResponse.json(leads);
}
