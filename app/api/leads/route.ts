import { prisma } from "@/lib/database/prisma";
import { LeadStatus, LeadPriority } from "@/lib/database/prisma/enums";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const pageParam = Number(searchParams.get("page"));
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const search = searchParams.get("search");
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  const PAGE_SIZE = 50;

  const where = {
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
            mode: "insensitive" as const,
          },
        },
        {
          companyName: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
  };

  const [leads, total] = await prisma.$transaction([
    prisma.lead.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({
    data: leads,
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
      hasNextPage: page * PAGE_SIZE < total,
      hasPreviousPage: page > 1,
    },
  });
}
