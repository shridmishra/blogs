import { getPostBySlug, getAllPosts } from '@/lib/content'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi'
import { mdxComponents } from '@/app/mdx-components' // Import mdxComponents directly
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
  const awaitedParams = await params
  const post = await getPostBySlug(awaitedParams.slug).catch(() => notFound())
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const awaitedParams = await params
  const post = await getPostBySlug(awaitedParams.slug).catch(() => notFound())

  return (
    <>
      <ReadingProgressBar />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <article>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-center">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 mb-8 text-sm text-gray-500">
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
          <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>
    </>
  )
}
