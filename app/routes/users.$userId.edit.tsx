import { redirect, type LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import JsonPlaseholderAPI from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI';
import { Box, Button, Card, CardContent, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material'

export const loader = async ({
  params: { userId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  //console.log(params)
  if (!userId) throw new Error('No iser ID provided')
  return await JsonPlaseholderAPI.getUser({ signal, userId: Number(userId) })
}


export const action = async ({ request, params }: Parameters<LoaderFunction>[number]) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  if (!params.userId) throw new Error('No user ID provided')

  await JsonPlaseholderAPI.updateUser({ signal: request.signal, userId: Number(params.userId), updates })

  return redirect(`/users/${params.userId}`)
}

export default function UserEditPage() {
  const user = useLoaderData<typeof loader>()

  //console.log('user', user)
  return (
    <>
      <Typography variant="h5" gutterBottom>
        Edit User
      </Typography>
      <Card>
        <CardContent>
          <Form method="patch">
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Name</InputLabel>
                <OutlinedInput id="name" name="name" label="Name" fullWidth defaultValue={user.name} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput id="username" name="username" label="username" fullWidth defaultValue={user.username} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <OutlinedInput id="email" name="email" label="E-mail" fullWidth defaultValue={user.email} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <OutlinedInput id="phone" name="phone" label="Phone" fullWidth defaultValue={user.phone} />
              </FormControl>
            </Box>
            <Box mb={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="website">Website</InputLabel>
                <OutlinedInput id="website" name="website" label="website" fullWidth defaultValue={user.website} />
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
