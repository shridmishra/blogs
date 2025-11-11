import type { MDXComponents } from 'mdx/types'
import { Separator } from '../components/ui/separator'
import Image from 'next/image'

export const mdxComponents: MDXComponents = {
  h1: ({ ...props }) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className="mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h4: ({ ...props }) => (
    <h4
      className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h5: ({ ...props }) => (
    <h5
      className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight"
      {...props}
    />
  ),
  h6: ({ ...props }) => (
    <h6
      className="mt-8 scroll-m-20 text-base font-semibold tracking-tight"
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <a className="font-medium underline underline-offset-4" {...props} />
  ),
  p: ({ ...props }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: ({ ...props }) => (
    <ul className="my-6 ml-6 list-disc" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="my-6 ml-6 list-decimal" {...props} />
  ),
  li: ({ ...props }) => <li className="mt-2" {...props} />,
  blockquote: ({ ...props }) => (
    <blockquote
      className="mt-6 border-l-2 pl-6 italic"
      {...props}
    />
  ),
  img: ({
    alt,
    width,
    height,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      className="rounded-md border"
      alt={alt || ''}
      width={Number(width || 700)}
      height={Number(height || 400)}
      src={src as string || ''}
      {...props}
    />
  ),
  hr: ({ ...props }) => <Separator className="my-4 md:my-8" {...props} />,
  table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: ({ ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="m-0 border-t p-0 even:bg-muted"
      {...props}
    />
  ),
  th: ({ ...props }) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  pre: ({ ...props }) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
      {...props}
    />
  ),
  code: ({ ...props }) => (
    <code
      className="relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
}
