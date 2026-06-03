import type { ReactNode } from "react";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children: ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  footer,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/3" />
        </div>

        <div>
          <span className="text-3xl font-bold text-white tracking-tight">
            Becee
          </span>
          <span className="text-sm font-medium text-white/60 ml-2">CRM</span>
        </div>

        <div className="relative z-10 text-white/40 text-sm">
          © {new Date().getFullYear()} Becee · Tous droits réservés
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-center">
            <span className="text-2xl font-bold text-primary tracking-tight">
              Becee
            </span>
            <span className="text-sm font-medium text-muted-foreground ml-1.5">
              CRM
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>

            {subtitle && (
              <p className="text-muted-foreground mt-1.5 text-sm">{subtitle}</p>
            )}
          </div>

          {children}

          {footer && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              {footer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
