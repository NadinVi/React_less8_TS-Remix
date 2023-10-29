import { redirect, type LoaderFunction } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'

import JsonPlaseholderAPI from "~/api/JsonPlaseholderAPI/JsonPlaseholderAPI"

export const loader = async ({
  params: { postId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaseholderAPI.getPost({ signal, postId })
}

export const action = async ({ request, params }: Parameters<LoaderFunction>[number]) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  await JsonPlaseholderAPI.updatePost({ signal: request.signal, postId: params.postId, updates })

  return redirect(`/posts/${params.postId}`)
}

export default function PostEditPage() {
  const post = useLoaderData<typeof loader>();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Edit Post
      </Typography>
      <Card>
        <CardContent>
          <Form method="patch">
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="title">Title</InputLabel>
                <OutlinedInput id="title" name="title" label="Title" fullWidth defaultValue={post.title} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="postbody">Text Post</InputLabel>
                <OutlinedInput id="postbody" name="postbody" label="Text Post" fullWidth defaultValue={post.body} />
              </FormControl>
            </Box>
            <Button variant={'contained'} type="submit" color={'primary'}>
              Save
            </Button>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
