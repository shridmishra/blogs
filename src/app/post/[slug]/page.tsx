import { getPostBySlug, getAllPosts } from '@/lib/content'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'
import { useMDXComponents } from '@/app/mdx-components'
import { ReadingProgressBar } from '@/components/ReadingProgressBar'
import { CopyLinkButton } from '@/components/CopyLinkButton'

type PostPageProps = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug).catch(() => notFound())
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug).catch(() => notFound())
  const components = useMDXComponents({})

  return (
    <>
      <ReadingProgressBar />
      <article className="py-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center space-x-4 mb-8 text-sm text-muted-foreground">
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
                <CopyLinkButton />
              </div>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>
      </article>
    </>
  )
}
