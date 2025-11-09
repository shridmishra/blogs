import Link from 'next/link'
import { Post } from '@/lib/content'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'

type PostCardProps = {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="py-8 border-b border-border">
      <h2 className="text-2xl font-bold">
        <Link href={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="text-muted-foreground mt-2">{post.excerpt}</p>
      <div className="flex items-center space-x-4 mt-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <FiUser className="h-4 w-4" />
          <span>{post.author.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiCalendar className="h-4 w-4" />
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <div className="flex items-center space-x-1">
          <FiClock className="h-4 w-4" />
          <span>{post.readingTime}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag}`}
            className="text-xs font-semibold uppercase text-primary hover:underline"
          >
            {tag}
          </Link>
        ))}
      </div>
    </article>
  )
}
