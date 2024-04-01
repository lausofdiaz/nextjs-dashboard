import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = 'https://localhost:7198/api'
const TEST_URL = 'https://localhost:7193/'

export default axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const privateApi = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('jwt')}`,
  },
  withCredentials: true,
})

export const testApi = axios.create({
  baseURL: TEST_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})
