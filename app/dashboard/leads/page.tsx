import LeadsListClient from "@/Components/dashboard/LeadsListClient";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Leads() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }

  return <LeadsListClient />;
}
