import Link from 'next/link'
import { Post } from '@/lib/content'
import { Calendar, User, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type PostCardProps = {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="pb-10 border-b border-border last:border-b-0">
      <h2 className="text-3xl font-bold leading-tight mb-2">
        <Link href={`/post/${post.slug}`} className="hover:text-muted-foreground transition-colors duration-200">
          {post.title}
        </Link>
      </h2>
      <p className="text-lg text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <User className="h-4 w-4" />
          <span>{post.author.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{post.readingTime}</span>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Link key={tag} href={`/tag/${tag}`}>
            <Badge variant="secondary">{tag}</Badge>
          </Link>
        ))}
      </div>
    </article>
  )
}
