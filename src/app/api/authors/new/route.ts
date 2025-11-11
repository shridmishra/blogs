import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { handle, name, bio, avatar } = await request.json()

    // 1. Validate input
    if (!handle || !name || !bio) {
      return NextResponse.json({ message: 'Missing required fields: handle, name, bio' }, { status: 400 })
    }

    const authorsFilePath = path.join(process.cwd(), 'content', 'authors.ts')
    let authorsContent = await fs.readFile(authorsFilePath, 'utf8')

    // Check if author handle already exists
    if (authorsContent.includes(`'${handle}':`)) {
      return NextResponse.json({ message: `Author with handle '${handle}' already exists` }, { status: 409 })
    }

    // Construct the new author entry
    const newAuthorEntry = `  '${handle}': {
    handle: '${handle}',
    name: '${name}',
    bio: '${bio}',
    ${avatar ? `avatar: '${avatar}',` : ''}
  },`

    // Find the closing brace of the authors object and insert the new entry before it
    const closingBraceIndex = authorsContent.lastIndexOf('};')
    if (closingBraceIndex === -1) {
      return NextResponse.json({ message: 'Could not find authors object in authors.ts' }, { status: 500 })
    }

    // Insert the new author entry before the closing '};'
    authorsContent =
      authorsContent.substring(0, closingBraceIndex) +
      `
${newAuthorEntry}
` +
      authorsContent.substring(closingBraceIndex)

    await fs.writeFile(authorsFilePath, authorsContent, 'utf8')

    return NextResponse.json({ message: 'Author created successfully', handle }, { status: 201 })
  } catch (error) {
    console.error('Error creating author:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
