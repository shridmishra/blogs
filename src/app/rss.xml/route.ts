import { getAllPosts } from '@/lib/content'
import RSS from 'rss'

const site_url = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-url.com' 
  : 'http://localhost:3000';

export async function GET() {
  const posts = await getAllPosts()

  const feedOptions = {
    title: 'Blogs | A Minimalist Blog',
    description: 'A minimalist blog built with Next.js and Tailwind CSS.',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`, // TODO: Add a logo
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Your Name`,
  };

  const feed = new RSS(feedOptions);

  posts.forEach(post => {
    feed.item({
      title: post.title,
      description: post.excerpt,
      url: `${site_url}/post/${post.slug}`,
      guid: post.slug,
      date: post.date,
      author: post.author.name,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
    },
  });
}
