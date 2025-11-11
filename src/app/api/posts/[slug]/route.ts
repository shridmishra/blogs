import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { getPostBySlug } from '@/lib/content'
import { authors } from '@/content/authors'
import TurndownService from 'turndown'

export async function GET(
  request: Request,
  context: any
) {
  try {
    const post = await getPostBySlug(context.params.slug)
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  context: any
) {
  try {
    const { title, author, content } = await request.json()

    // 1. Validate input
    if (!title || !author || !content) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Validate author handle
    if (!authors[author]) {
      return NextResponse.json({ message: 'Invalid author handle' }, { status: 400 })
    }

    // Convert HTML content to Markdown
    const turndownService = new TurndownService()
    const markdownContent = turndownService.turndown(content)

    // 2. Generate filename and path
    const fileName = `${context.params.slug}.mdx`
    const postsDirectory = path.join(process.cwd(), 'content', 'posts')
    const filePath = path.join(postsDirectory, fileName)

    // Check if the post exists
    try {
      await fs.access(filePath)
    } catch (error) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    // 3. Construct MDX content with frontmatter
    const date = new Date().toISOString().split('T')[0] // YYYY-MM-DD
    const authorName = authors[author].name

    const mdxContent = `---
title: "${title}"
date: "${date}"
author: "${author}"
excerpt: "${markdownContent.substring(0, 150)}..."
---

${markdownContent}
`

    // 4. Write the MDX content to the file
    await fs.writeFile(filePath, mdxContent, 'utf8')

    return NextResponse.json({ message: 'Post updated successfully', slug: context.params.slug }, { status: 200 })
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE() {
  return NextResponse.json({ message: 'DELETE for specific post (Under Construction)' })
}
