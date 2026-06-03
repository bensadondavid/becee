import { prisma } from "@/lib/database/prisma";

async function createUser() {
  await prisma.allowedUser.createMany({
    data: [
      { email: "bensadondavidn@gmail.com" },
      { email: "beceeweb@gmail.com" },
    ],
    skipDuplicates: true,
  });
}

createUser();
console.log("user crée");
