import { prisma} from "@/lib/database/prisma";
import LeadsListClient from "@/components/dashboard/LeadsListClient";
import { LeadStatus, LeadPriority } from "@/lib/database/prisma/enums";


export default async function LeadsPage({searchParams }: { searchParams: Promise<{ page?: string; search?: string; status?: string; priority?: string;}>;}) {

  const params = await searchParams

  const page = Number(params.page) || 1;
  const status = params.status
  const search = params.search
  const priority = params.priority 

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
                  },
                },
                {
                  companyName: {
                    contains: search,
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

  return <LeadsListClient leads={leads} />;
}