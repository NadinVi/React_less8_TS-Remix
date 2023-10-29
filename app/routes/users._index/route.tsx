import { List, ListItem, ListItemText, Typography } from '@mui/material';
import type { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import JsonPlaseholderAPI from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI';

export const loader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaseholderAPI.getUsers({ signal })
}

export default function UsersPage() {
  const users = useLoaderData<typeof loader>();

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id} component={Link} to={`/users/${user.id}`}>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </>
  );
}
