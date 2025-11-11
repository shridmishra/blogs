'use client'

import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import RichTextEditor from '@/components/ui/RichTextEditor'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState } from 'react'
import { authors } from '@/content/authors'

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  slug: z.string().min(1, { message: 'Slug is required.' }),
  author: z.string().min(1, { message: 'Author handle is required.' }),
  content: z.string().min(1, { message: 'Content is required.' }),
})

export default function NewPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      author: '',
      content: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const response = await fetch('/api/posts/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        form.setError('root.serverError', {
          message: errorData.message || 'Failed to create post',
        })
        return
      }

      const result = await response.json()
      alert(result.message) // Consider a more sophisticated notification
      form.reset()
      router.push(`/post/${result.slug}`)
    } catch (err: unknown) {
      form.setError('root.serverError', {
        message: err instanceof Error ? err.message : 'An unexpected error occurred.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto py-8 max-w-4xl">
      <Card className="mx-auto max-w-4xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create New Post</CardTitle>
          <CardDescription className="text-center">
            Enter the details for the new post.
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
                    <FormLabel>Author</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an author" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(authors).map((author) => (
                          <SelectItem key={author.handle} value={author.handle}>
                            {author.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                {loading ? 'Creating...' : 'Create Post'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
