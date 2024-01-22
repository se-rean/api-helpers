const axios = require('axios')
const { getToken } = require('../init/DTCMAccessToken')
const apiUrl = process.env.BASE_URL || 'https://et-apiuat.detsandbox.com/'
 
const request = axios.create({
  baseURL: `${apiUrl}`,
  timeout: 5000, // 5 seconds timeout
  Host: '',
  "User-Agent":'PostmanRuntime/7.36.1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  }
})

const auth = () => request.defaults.headers.Authorization = `Bearer ${getToken()}`

const httpClientRequest = Object.freeze({
  get: async (URL, payload) => {
    try {
      auth()
      const response = await request.get(`${URL}`, payload)
      return {data: response.data, statusCode: response.status}
    } catch (error) {
      console.info(`Error on Get request: ${URL}, ${error}`)
    }
  },
  post: async (URL, payload) => {
    try {
      auth()
      const response = await request.post(`${URL}`, payload)
      return {data: response.data, statusCode: response.status}
    } catch (error) {
      console.info(`Error on POST request: ${URL}, ${error}`)
    }
  },
  put: async (URL, payload) => {
    try {
      auth()
      const response = await request.put(`${URL}`, payload)
      return {data: response.data, statusCode: response.status}
    } catch (error) {
      console.info(`Error on POST request: ${URL}, ${error}`)
    }
  },
  delete: async (URL, payload) => {
    try {
      auth()
      const response = await request.delete(`${URL}`)
      return {data: response.data, statusCode: response.status}
    } catch (error) {
      console.info(`Error on Delete request: ${URL}, ${error}`)
    }
  },
})

module.exports = httpClientRequest
