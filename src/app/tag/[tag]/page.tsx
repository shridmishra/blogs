import { getAllPosts, Post } from '@/lib/content'
import { PostCard } from '@/components/PostCard'
import { notFound } from 'next/navigation'

type TagPageProps = {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const allTags = new Set(posts.flatMap((post) => post.tags))
  return Array.from(allTags).map((tag) => ({
    tag,
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  return {
    title: `Posts tagged with "${tag}"`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const allPosts = await getAllPosts()
  const tag = decodeURIComponent(params.tag)
  const taggedPosts = allPosts.filter((post) => post.tags.includes(tag))

  if (taggedPosts.length === 0) {
    notFound()
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">
        Posts tagged with "{tag}"
      </h1>
      <div>
        {taggedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
