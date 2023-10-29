import type { LoaderFunction } from '@remix-run/node'
import JsonPlaseholderAPI from '../../api/JsonPlaseholderAPI/JsonPlaseholderAPI'
import { Link, useLoaderData } from '@remix-run/react'
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'

export const loader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaseholderAPI.getPosts({ signal })
}

export default function PostsPage() {
    const posts = useLoaderData<typeof loader>()

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <Card key={post.id} className="card">
            <CardContent>
              <ListItem key={post.id} component={Link} to={`/posts/${post.id}`}>
                <ListItemText primary={post.title} secondary={post.body} />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  )
}
