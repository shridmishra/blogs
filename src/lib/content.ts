import { promises as fs } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { authors, Author } from '@/content/authors'
import { format } from 'date-fns'

export type Post = {
  slug: string
  title: string
  date: string
  updated?: string
  author: Author
  tags: string[]
  excerpt: string
  draft: boolean
  content: string
  readingTime: string
}

const postsDirectory = path.join(process.cwd(), 'content/posts')

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const noOfWords = content.split(/\s/g).length
  const minutes = noOfWords / wordsPerMinute
  const readTime = Math.ceil(minutes)
  return `${readTime} min read`
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = await fs.readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const postAuthor = authors[data.author as string]

  return {
    slug: realSlug,
    title: data.title,
    date: format(new Date(data.date), 'MMMM d, yyyy'),
    updated: data.updated ? format(new Date(data.updated), 'MMMM d, yyyy') : undefined,
    author: postAuthor,
    tags: (data.tags || []) as string[],
    excerpt: data.excerpt,
    draft: data.draft || false,
    content,
    readingTime: calculateReadingTime(content),
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await fs.readdir(postsDirectory)
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)))

  // Sort posts by date in descending order and filter out drafts
  return posts
    .filter((post) => process.env.NODE_ENV === 'development' || !post.draft)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}
