import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

export default async function Topbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const name = session?.user.name;
  const email = session?.user.email;

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-end px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="text-left flex flex-col justify-center gap-2">
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs font-light leading-none">{email}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
          {name?.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
