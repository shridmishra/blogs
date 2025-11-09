'use client'

import { useMDXComponents } from '@/app/mdx-components'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { MDXComponents } from 'mdx/types'

export function MdxContent({ source, components, ...props }: MDXRemoteProps) {
  const mdxComponents = useMDXComponents((components || {}) as MDXComponents)
  return <MDXRemote source={source} components={mdxComponents} {...props} />
}
