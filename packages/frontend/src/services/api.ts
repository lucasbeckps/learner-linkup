import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VITE_API_URL
})

export interface QueryState<TData, TError> {
  isPending: boolean
  isFetching: boolean
  isError: boolean
  data: TData | undefined
  error: TError | null
}

export default api
