import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 mt-16 border-t border-border">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-muted-foreground">&copy; {currentYear} Blogs</p>
        <div className="flex items-center space-x-4">
          <Link href="/about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
          <Link href="/rss.xml" className="text-muted-foreground hover:text-foreground">
            RSS
          </Link>
        </div>
      </div>
    </footer>
  )
}
