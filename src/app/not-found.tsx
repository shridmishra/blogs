import Link from 'next/link'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))]">
      <Frown className="w-24 h-24 text-primary" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-base text-muted-foreground">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Go back home
      </Link>
    </div>
  )
}
