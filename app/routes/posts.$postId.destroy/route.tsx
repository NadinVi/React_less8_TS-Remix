import { type LoaderFunction, redirect } from '@remix-run/node'
import JsonPlaseholderAPI from "~/api/JsonPlaseholderAPI/JsonPlaseholderAPI"

export const action = async ({
  params: { postId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  await JsonPlaseholderAPI.deletePost({ signal, postId })

  return redirect('/posts')
}
