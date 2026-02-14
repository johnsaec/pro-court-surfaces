import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">Pro Court Surfaces</h1>
      <p className="text-muted-foreground text-lg">
        Quoting &amp; invoicing platform
      </p>
      <Link
        href="/admin"
        className="text-primary underline underline-offset-4 hover:opacity-80"
      >
        Go to Admin Dashboard
      </Link>
    </div>
  );
}
