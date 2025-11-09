# Blogs

This is a minimalist blog application built with Next.js, TypeScript, and Tailwind CSS. It is designed to be a clean, typography-focused platform for reading and writing.

## Features

*   **Pure Black & White Theme**: A minimalist, Medium-like design with a focus on readability.
*   **Light/Dark Mode**: Toggle between light and dark themes.
*   **MDX Content**: Posts are written in MDX, allowing for rich content with components.
*   **Content Layer**: A typed content layer provides strongly typed post metadata.
*   **Core Blog Pages**: Home feed, post pages, author pages, and tag pages.
*   **Client-Side Search**: Fuzzy search over post titles, excerpts, and tags.
*   **RSS Feed & Sitemap**: An RSS feed is available at `/rss.xml` and a sitemap at `/sitemap.xml`.
*   **Reading Progress Bar**: A progress bar indicates how far you've scrolled through a post.
*   **Copy Link**: Easily copy the link to a post.

## Tech Stack

*   [Next.js](https://nextjs.org/) (App Router)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [shadcn/ui](https://ui.shadcn.com/)
*   [React Icons](https://react-icons.github.io/react-icons/)
*   [MDX](https://mdxjs.com/)
*   [Fuse.js](https://fusejs.io/) for fuzzy search
*   [RSS](https://www.npmjs.com/package/rss) for RSS feed generation

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/en/) (v18 or later)
*   [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/blogs.git
    cd blogs
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Run the development server:**

    ```bash
    pnpm dev
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Adding New Components with shadcn/ui

This project uses [shadcn/ui](https://ui.shadcn.com/) for its components. To add a new component, you can use the `shadcn` CLI:

```bash
npx shadcn@latest add [component-name]
```

For example, to add an `alert-dialog`:

```bash
npx shadcn@latest add alert-dialog
```

This will add the component files to `src/components/ui`.

## Content

Blog posts are stored as MDX files in the `content/posts` directory. Each post has frontmatter that defines its metadata:

```yaml
---
title: 'My First Post'
slug: 'first-post'
date: '2025-11-09'
updated: '2025-11-09'
author: 'jane-doe'
tags: ['nextjs', 'typescript', 'tailwind']
excerpt: 'This is the excerpt for my first post. It is a short summary of the content.'
draft: false
---
```

Author information is stored in `content/authors.ts`.

## Building for Production

To create a production build, run:

```bash
pnpm build
```

And to start the production server:

```bash
pnpm start
```# blogs
