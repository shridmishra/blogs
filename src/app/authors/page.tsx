import { authors } from '@/content/authors';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthorsPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Authors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(authors).map((author) => (
          <div key={author.handle} className="bg-card p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            {author.avatar && (
              <Image
                src={author.avatar}
                alt={author.name}
                width={96}
                height={96}
                className="rounded-full mb-4 object-cover"
              />
            )}
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

