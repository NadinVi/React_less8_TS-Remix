import { redirect, type LoaderFunction } from '@remix-run/node'
import JsonPlaseholderAPI from '~/api/JsonPlaseholderAPI/JsonPlaseholderAPI'

export const action = async ({
  params: { commentId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  await JsonPlaseholderAPI.deleteComment({ signal, commentId })

  return redirect('/comments')
}
