import type { FetchArg } from './types'

class API {
  private readonly baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async fetch<ResponceType = unknown>({ path = '', method = 'GET', body, signal, headers = {}, ...rest }: FetchArg) {
    const response = await fetch(`${this.baseUrl}/${path}`, {
      method,
      signal,
      headers: {
        ContentType: 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
      ...rest,
    })
    return (await response.json()) as Awaited<ResponceType>
  }
}

export { API }
