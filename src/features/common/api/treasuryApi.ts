import axios from 'axios'

import { API_BASE_URL } from '@/features/common/consts'
import { useBoundStore } from '@/store'

export const treasuryApi = axios.create({
  baseURL: API_BASE_URL
})

treasuryApi.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
)

treasuryApi.interceptors.request.use((config) => {
  const { token } = useBoundStore.getState()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})