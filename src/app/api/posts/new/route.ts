import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { authors } from '@/content/authors' // Import authors for validation
import TurndownService from 'turndown'

export async function POST(request: Request) {
  try {
    const { title, slug, author, content } = await request.json()

    // 1. Validate input
    if (!title || !slug || !author || !content) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    // Validate author handle
    if (!authors[author]) {
      return NextResponse.json({ message: 'Invalid author handle' }, { status: 400 })
    }

    // 2. Generate filename and path
    const fileName = `${slug}.mdx`
    const postsDirectory = path.join(process.cwd(), 'content', 'posts')
    const filePath = path.join(postsDirectory, fileName)

    // Check if a post with the same slug already exists
    try {
      await fs.access(filePath)
      return NextResponse.json({ message: `Post with slug '${slug}' already exists` }, { status: 409 })
    } catch (error) {
      // File does not exist, which is good, continue to create
    }

    // Convert HTML content to Markdown
    const turndownService = new TurndownService()
    const markdownContent = turndownService.turndown(content)

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

    // 4. Write the MDX content to a new file
    await fs.writeFile(filePath, mdxContent, 'utf8')

    return NextResponse.json({ message: 'Post created successfully', slug }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
