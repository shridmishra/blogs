
import { getAllPosts } from '@/lib/content'
import { PostCard } from '@/components/PostCard'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
     
      <div className="space-y-12">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </main>
  )
}
