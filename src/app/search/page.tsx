'use client'

import { useState, useEffect } from 'react'
import { Post } from '@/lib/content'
import { PostCard } from '@/components/PostCard'
import Fuse from 'fuse.js'
import useDebounce from '@/lib/hooks/useDebounce' // Import useDebounce

export default function SearchPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Post[]>([])
  const [fuse, setFuse] = useState<Fuse<Post> | null>(null)

  const debouncedQuery = useDebounce(query, 500) // Debounce the query with a 500ms delay

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch('/api/posts')
      const posts = await response.json()
      setAllPosts(posts)
      setFuse(
        new Fuse(posts, {
          keys: ['title', 'excerpt', 'tags'],
          includeScore: true,
          threshold: 0.4,
        })
      )
    }
    loadPosts()
  }, [])

  useEffect(() => {
    if (fuse && debouncedQuery) {
      const searchResults = fuse.search(debouncedQuery)
      setTimeout(() => {
        setResults(searchResults.map((result) => result.item))
      }, 0)
    } else {
      setTimeout(() => {
        setResults([])
      }, 0)
    }
  }, [debouncedQuery, fuse])

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-8">Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for posts..."
        className="w-full p-2 border border-border rounded-md bg-input"
      />

      <div className="mt-8">
        {query && results.length > 0 && (
          <h2 className="text-xl font-bold mb-4">
            Found {results.length} {results.length === 1 ? 'result' : 'results'}
          </h2>
        )}
        {query && results.length === 0 && (
            <p>No results found for &quot;{query}&quot;.</p>
        )}
        {results.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
