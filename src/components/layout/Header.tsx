import Link from 'next/link'
import { FiSearch } from 'react-icons/fi'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Header() {
  return (
    <header className="py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Blogs
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/search">
            <FiSearch className="h-6 w-6" />
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
