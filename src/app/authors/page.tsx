import { authors, Author } from '@/content/authors';
import Link from 'next/link';
import Image from 'next/image';

function AuthorAvatar({ author }: { author: Author }) {
    if (author.avatar) {
        return (
            <Image
                src={author.avatar}
                alt={author.name}
                width={96}
                height={96}
                className="rounded-full mb-4 object-cover"
            />
        )
    }

    const initials = author.name
        .split(' ')
        .map((n) => n[0])
        .join('')

    return (
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-4xl font-bold">{initials}</span>
        </div>
    )
}

export default function AuthorsPage() {
  return (
    <main className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Authors</h1>
        <Link href="/authors/new" className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Add New Author
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(authors).map((author) => (
          <div key={author.handle} className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <AuthorAvatar author={author} />
            <h2 className="text-2xl font-semibold mb-2">{author.name}</h2>
            <p className="text-muted-foreground mb-4">{author.bio}</p>
            <Link href={`/author/${author.handle}`} className="text-primary hover:underline">
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

