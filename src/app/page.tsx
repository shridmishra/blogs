import Image from "next/image";

import { getAllPosts } from '@/lib/content'
import { PostCard } from '@/components/PostCard'

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">All Posts</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
