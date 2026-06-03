export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold">Accès refusé</h1>
        <p className="text-muted-foreground">
          Ce compte Google n’est pas autorisé à accéder au CRM Becee.
        </p>
      </div>
    </main>
  );
}
