import { redirect, type LoaderFunction } from "@remix-run/node"
import JsonPlaseholderAPI from "~/api/JsonPlaseholderAPI/JsonPlaseholderAPI"

export const action = async ({
  params: { userId },
  request: { signal },
}: Parameters<LoaderFunction>[number]) => {
  if (!userId) throw new Error('No iser ID provided')

  await JsonPlaseholderAPI.deleteUser({ signal, userId: Number(userId) })

  return redirect('/users')
}
