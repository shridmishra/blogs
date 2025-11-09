'use client'

import { mdxComponents as customMdxComponents } from '@/app/mdx-components'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

export function MdxContent({ source, components, ...props }: MDXRemoteProps) {
  return <MDXRemote source={source} components={{ ...customMdxComponents, ...components }} {...props} />
}
