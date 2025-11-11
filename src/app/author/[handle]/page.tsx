import { authors, Author } from '@/content/authors'
import { getAllPosts } from '@/lib/content'
import { notFound } from 'next/navigation'
import { PostCard } from '@/components/PostCard'
import Image from 'next/image'

type AuthorPageProps = {
  params: {
    handle: string
  }
}

export async function generateStaticParams() {
  return Object.keys(authors).map((handle) => ({
    handle,
  }))
}

export async function generateMetadata({ params: awaitedParams }: AuthorPageProps) {
  const params = await awaitedParams
  const author = authors[params.handle]
  if (!author) {
    notFound()
  }
  return {
    title: author.name,
    description: author.bio,
  }
}

function AuthorAvatar({ author }: { author: Author }) {
    if (author.avatar) {
        return (
            <Image
                src={author.avatar}
                alt={author.name}
                width={96}
                height={96}
                className="rounded-full"
            />
        )
    }

    const initials = author.name
        .split(' ')
        .map((n) => n[0])
        .join('')

    return (
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl font-bold">{initials}</span>
        </div>
    )
}

export default async function AuthorPage({ params: awaitedParams }: AuthorPageProps) {
  const params = await awaitedParams
  const author = authors[params.handle]
  if (!author) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const authorPosts = allPosts.filter((post) => post.author.handle === params.handle)

  return (
    <div className="py-8">
      <div className="flex flex-col items-center text-center mb-12">
        <AuthorAvatar author={author} />
        <h1 className="text-4xl font-bold mt-4">{author.name}</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl">{author.bio}</p>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-center">Posts by {author.name}</h2>
      <div>
        {authorPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
