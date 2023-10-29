import type { LoaderFunction } from "@remix-run/node"
import JsonPlaseholderAPI from "~/api/JsonPlaseholderAPI/JsonPlaseholderAPI"

import { Box, Button, Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material'

import type { User } from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI'
import { Form, Link, useLoaderData } from "@remix-run/react"

const FIELDS = [
  { name: 'Name', key: 'name' },
  { name: 'Username', key: 'username' },
  { name: 'Email', key: 'email' },
  { name: 'Phone', key: 'phone' },
  { name: 'Website', key: 'website' },
] satisfies { name: string; key: keyof Pick<User, 'name' | 'username' | 'email' | 'phone' | 'website'> }[]

export const loader = async ({
  params: { userId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  //console.log(params)
  if (!userId) throw new Error('No user ID provided')
  return await JsonPlaseholderAPI.getUser({ signal, userId: Number(userId) })
}

export default function UserDetails() {
  const user = useLoaderData<typeof loader>()
  return (
    <>
      <Typography variant="h5" gutterBottom>
        User Details
      </Typography>
      {user && (
        <Card>
          <CardContent>
            <List>
              {FIELDS.map((field) => (
                <ListItem key={field.key}>
                  <ListItemText primary={field.name} secondary={user[field.key]}></ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      <Box mt={2} display="flex" flexDirection="row">
        <Box mr={2}>
          <Button component={Link} variant="contained" color="primary" to="edit">
            Edit User
          </Button>
        </Box>
        <Form
          method="delete"
          action="destroy"
          onSubmit={(event) => {
            if (!confirm('Please confirm that you want to delete this user.')) {
              event.preventDefault()
            }
          }}>
          <Button variant="contained" color="error" type="submit">
            Delete User
          </Button>
        </Form>
      </Box>
    </>
  )
}
