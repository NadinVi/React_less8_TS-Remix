import type{ LoaderFunction } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'
import JsonPlaseholderAPI from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI'
import type { Posts } from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI'

const POSTS = [
    { name: 'Title', key: 'title' },
    { name: 'Text post', key: 'body' },
  ] satisfies { name: string; key: keyof Pick<Posts, 'title' | 'body'> }[]

  

export const loader = async ({
  params: { postId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaseholderAPI.getPost({ signal, postId })
}

export default function PostDetails() {
    const post = useLoaderData<typeof loader>()
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Post Details
      </Typography>
      {post && (
        <Card>
          <CardContent>
            <List>
              {POSTS.map((text) => (
                <ListItem key={text.key}>
                  <ListItemText primary={text.name} secondary={post[text.key]}></ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      <Box mt={2} display="flex" flexDirection="row">
        <Box mr={2}>
          <Button component={Link} variant="contained" color="primary" to="edit">
            Edit Post
          </Button>
        </Box>
        <Form
          method="delete"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm('Delete this post?')) {
              event.preventDefault()
            }
          }}>
          <Button variant="contained" color="error" type="submit">
            Delete Post
          </Button>
        </Form>
      </Box>
    </>
  )
}
