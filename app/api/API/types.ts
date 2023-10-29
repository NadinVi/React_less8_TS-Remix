export interface FetchArg extends Omit<RequestInit, 'body'> {
  path?: string
  body?: Record<string, unknown>
}
