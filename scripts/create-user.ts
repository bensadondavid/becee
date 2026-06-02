import { auth } from "@/lib/auth/auth";

async function main() {
  await auth.api.signUpEmail({
    body: {
      name: "David",
      email: "beceeweb@gmail.com",
      password: "YonaNitai0505!",
    },
  });

  console.log("Admin créé");
}

main().catch((error) => {
  console.error("Erreur lors de la création de l'admin", error);
  process.exit(1);
});