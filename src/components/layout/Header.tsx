import Link from 'next/link'
import { Search } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl bg-background/50 rounded-xl backdrop-blur-lg border border-border py-3 px-6">
      <div className="container mx-auto flex items-center justify-between ">
        <Link href="/" className="text-2xl font-bold">
          Blogs
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/authors" className="text-sm font-medium transition-colors hover:text-primary hidden sm:block">
          Authors
          </Link>
          <Link href="/post/new" className="text-sm font-medium transition-colors hover:text-primary hidden sm:block">
           Post
          </Link>
          <Link href="/search">
            <Search className="h-6 w-6" />
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
