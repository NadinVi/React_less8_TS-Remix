import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react';
import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'

import JsonPlaseholderAPI from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI'

export const loader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaseholderAPI.getComments({ signal })
}

export default function CommentsPage() {
  const comments = useLoaderData<typeof loader>();

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <List>
        {comments.map((comment) => (
          <Card key={comment.id} className="card">
            <CardContent>
              <ListItem component={Link} to={`/comments/${comment.id}`}>
                <ListItemText primary={comment.name} secondary={comment.body} />
              </ListItem>
            </CardContent>
          </Card>
        ))}
      </List>
    </>
  )
}
