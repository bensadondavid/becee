import { prisma } from "@/lib/database/prisma";
import { LeadPriority } from "@/lib/database/prisma/enums";
import { LeadStatus } from "@/lib/database/prisma/enums";

const leads = [
  {
    contactName: "Jean Dupont",
    companyName: "Dupont Conseil",
    email: "jean@dupont.fr",
    phone: "0612345678",
    city: "Paris",
    country: "France",
    website: "https://dupont.fr",
    productType: "Site vitrine",
    status: LeadStatus.DEVIS_A_CREER,
    priority: LeadPriority.MOYENNE,
    notes: "Demande de devis",
  },
  {
    contactName: "Sophie Martin",
    companyName: "Martin Beauty",
    email: "sophie@martinbeauty.fr",
    phone: "0622334455",
    city: "Lyon",
    country: "France",
    website: "https://martinbeauty.fr",
    productType: "E-commerce",
    status: LeadStatus.CONTRAT_SIGNE,
    priority: LeadPriority.HAUTE,
    estimatedBudget: 8000,
    potentialValue: 8000,
    notes: "Projet validé",
  },
  {
    contactName: "David Cohen",
    companyName: "Cohen Immobilier",
    email: "david@cohen-immo.fr",
    phone: "0633445566",
    city: "Marseille",
    country: "France",
    productType: "CRM",
    status: LeadStatus.NRP_1,
    priority: LeadPriority.HAUTE,
  },
  {
    contactName: "Sarah Levy",
    companyName: "Levy Studio",
    email: "sarah@levystudio.fr",
    phone: "0644556677",
    city: "Nice",
    country: "France",
    productType: "Portfolio",
    status: LeadStatus.RDV,
    priority: LeadPriority.FAIBLE,
  },
  {
    contactName: "Marc Bernard",
    companyName: "Bernard Holding",
    email: "marc@bernard.fr",
    phone: "0655667788",
    city: "Toulouse",
    country: "France",
    productType: "Application métier",
    status: LeadStatus.NRP_2,
    priority: LeadPriority.MOYENNE,
  },
  {
    contactName: "Julie Moreau",
    companyName: "Moreau Design",
    email: "julie@moreau.fr",
    phone: "0666778899",
    city: "Bordeaux",
    country: "France",
    productType: "Landing page",
    status: LeadStatus.LEAD_FRAIS,
    priority: LeadPriority.FAIBLE,
  },
  {
    contactName: "Nathan Perez",
    companyName: "Perez Auto",
    email: "nathan@perez.fr",
    phone: "0677889900",
    city: "Lille",
    country: "France",
    productType: "CRM",
    status: LeadStatus.PAS_INTERESSE,
    priority: LeadPriority.MOYENNE,
  },
  {
    contactName: "Rachel Benhamou",
    companyName: "RB Consulting",
    email: "rachel@rb.fr",
    phone: "0688990011",
    city: "Strasbourg",
    country: "France",
    productType: "Site vitrine",
    status: LeadStatus.A_RAPPELER,
    priority: LeadPriority.MOYENNE,
  },
];

async function main() {
  await prisma.lead.createMany({
    data: leads,
  });

  console.log(`${leads.length} leads créés`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
