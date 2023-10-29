import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";

import JsonPlaseholderAPI from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI';
import { Grid, ImageList, ImageListItem, Typography } from '@mui/material'
import { Loader } from "~/components/Loader/Loader";

export const meta: MetaFunction = () => {
  return [
    { title: "Photos" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request: { signal } }: Parameters<LoaderFunction>[number]) => {
  return await JsonPlaseholderAPI.getPhotos({ signal })
}

export default function Index() {
  const photos = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading'

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Photos
      </Typography>
      <Grid container spacing={2}>
        {isLoading ? (
          <Loader />
        ) : (
          <ImageList gap={10} cols={5}>
            {photos.map((photo) => (
              <ImageListItem key={photo.id}>
                <img src={photo.url} alt={photo.title}></img>
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Grid>
    </>
  );
}
