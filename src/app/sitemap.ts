import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/content'
import { authors } from '@/content/authors'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NODE_ENV === 'production' 
    ? 'https://your-production-url.com' 
    : 'http://localhost:3000';

  const posts = await getAllPosts()
  const postUrls = posts.map(post => ({
    url: `${siteUrl}/post/${post.slug}`,
    lastModified: post.updated || post.date,
  }))

  const authorUrls = Object.keys(authors).map(handle => ({
    url: `${siteUrl}/author/${handle}`,
    lastModified: new Date(),
  }))

  const tagUrls = new Set(posts.flatMap(post => post.tags))
  const uniqueTagUrls = Array.from(tagUrls).map(tag => ({
    url: `${siteUrl}/tag/${tag}`,
    lastModified: new Date(),
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...postUrls,
    ...authorUrls,
    ...uniqueTagUrls,
  ]
}
