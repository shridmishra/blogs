'use client'

import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useEffect, useState } from 'react'
import RichTextEditor from '@/components/ui/RichTextEditor'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  slug: z.string().min(1, { message: 'Slug is required.' }),
  author: z.string().min(1, { message: 'Author handle is required.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
})

interface EditPostPageProps {
  params: {
    slug: string
  }
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<z.infer<typeof formSchema> | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      author: '',
      content: '',
    },
  })

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      try {
        const response = await fetch(`/api/posts/${params.slug}`)
        if (!response.ok) {
          throw new Error('Failed to fetch post')
        }
        const postData = await response.json()
        setPost(postData)
        form.reset(postData)
      } catch (error) {
        console.error('Error fetching post:', error)
        // Handle error, e.g., redirect to a 404 page or show an error message
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [params.slug, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await fetch(`/api/posts/${params.slug}`, {
        method: 'PUT', // Assuming PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        form.setError('root.serverError', {
          message: errorData.message || 'Failed to update post',
        })
        return
      }

      const result = await response.json()
      alert(result.message) // Consider a more sophisticated notification
      router.push(`/post/${result.slug}`)
    } catch (err: unknown) {
      form.setError('root.serverError', {
        message: err instanceof Error ? err.message : 'An unexpected error occurred.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading || !post) {
    return (
      <main className="container mx-auto py-8 max-w-4xl">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Loading Post...</CardTitle>
          </CardHeader>
        </Card>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-8 max-w-4xl">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit Post</CardTitle>
          <CardDescription className="text-center">
            Edit the details for the post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author Handle</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root?.serverError && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.root.serverError.message}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating...' : 'Update Post'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
