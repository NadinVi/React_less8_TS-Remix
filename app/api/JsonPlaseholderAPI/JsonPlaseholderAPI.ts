import { JSON_PLACEHOLDER_BASE_URL } from '../../constant'
import { API } from '../API/API'

export interface FetchArg {
  signal: AbortSignal
  userId?: number
  updates?: Record<string, unknown>
  commentId?: string
  postId?: string
}

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

export interface Comments {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}

export interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: Geo
}

export interface Geo {
  lat: string
  lng: string
}

export interface Company {
  name: string
  catchPhrase: string
  bs: string
}

export interface Posts {
  userId: number
  id: number
  title: string
  body: string
}

class JsonPlaceholderAPI extends API {
  // constructor(url) {
  //   super(url)
  // }

  async getPhotos({ signal }: FetchArg) {
    const response = await this.fetch<Photo[]>({ path: 'photos', signal })
    //console.log('response', response);
    return response.slice(0, 30)
  }

  async getUsers({ signal }: FetchArg) {
    return await this.fetch<User[]>({ path: 'users', signal })
  }

  async getUser({ signal, userId }: FetchArg) {
    return await this.fetch<User>({ path: `users/${userId}`, signal })
  }

  async deleteUser({ signal, userId }: FetchArg) {
    return await this.fetch({ path: `users/${userId}`, signal, method: 'DELETE' })
  }

  async updateUser({ signal, userId, updates }: FetchArg) {
    return await this.fetch({ path: `users/${userId}`, signal, method: 'PATCH', body: updates })
  }

  async getComments({ signal }: FetchArg) {
    const responseComments = await this.fetch<Comments[]>({ path: 'comments', signal })

    return responseComments.slice(0, 50)
  }

  async getComment({ signal, commentId }: FetchArg) {
    return await this.fetch<Comments>({ path: `comments/${commentId}`, signal })
  }

  async deleteComment({ signal, commentId }: FetchArg) {
    return await this.fetch({ path: `comments/${commentId}`, signal, method: 'DELETE' })
  }

  async getPosts({ signal }: FetchArg) {
    return await this.fetch<Posts[]>({ path: 'posts', signal })
  }

  async getPost({ signal, postId }: FetchArg) {
    return await this.fetch<Posts>({ path: `posts/${postId}`, signal })
  }

  async deletePost({ signal, postId }: FetchArg) {
    return await this.fetch({ path: `posts/${postId}`, signal, method: 'DELETE' })
  }

  async updatePost({ signal, postId, updates }: FetchArg) {
    return await this.fetch({ path: `posts/${postId}`, signal, method: 'PATCH', body: updates })
  }
}

export default new JsonPlaceholderAPI(JSON_PLACEHOLDER_BASE_URL)
