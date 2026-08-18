import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-warm-white px-6 py-32 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-4xl text-ink sm:text-5xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-sm text-ink/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="btn-focus mt-8 inline-block rounded-full bg-ink px-8 py-4 text-sm font-medium uppercase tracking-widest text-cream transition-colors hover:bg-gold-600"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
