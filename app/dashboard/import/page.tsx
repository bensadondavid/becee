import ImportLeadsClient from "@/Components/dashboard/ImportLeadsClient";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function ImportPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  return <ImportLeadsClient />;
}
