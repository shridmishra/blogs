import type { MDXComponents } from 'mdx/types'

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => <h1 className="text-4xl font-bold mt-10 mb-4 leading-tight">{children}</h1>,
  h2: ({ children }) => <h2 className="text-3xl font-bold mt-8 mb-3 leading-snug">{children}</h2>,
  h3: ({ children }) => <h3 className="text-2xl font-bold mt-6 mb-2 leading-normal">{children}</h3>,
  p: ({ children }) => <p className="text-lg mb-5 leading-relaxed">{children}</p>,
  a: ({ children, href }) => <a href={href} className="text-primary hover:underline">{children}</a>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-6">
      {children}
    </blockquote>
  ),
}
