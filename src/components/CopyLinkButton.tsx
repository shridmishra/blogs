'use client'

import { useState, useEffect } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

export function CopyLinkButton() {
  const [isCopied, setIsCopied] = useState(false)
  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
    >
      {isCopied ? (
        <>
          <FiCheck className="h-4 w-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <FiCopy className="h-4 w-4" />
          <span>Copy link</span>
        </>
      )}
    </button>
  )
}
