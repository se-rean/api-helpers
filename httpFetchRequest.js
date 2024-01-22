const { getToken } = require('../init/DTCMAccessToken')
const apiUrl = process.env.BASE_URL || 'https://et-apiuat.detsandbox.com/'
const apiKey = "3rcbhsn32xmwvu42bmk2pkak"
var myHeaders = new Headers();

const httpFetchRequest = Object.freeze({
  get: async (URL, payload) => {
    try {
      myHeaders.append(`Authorization`, `Bearer ${await getToken()}`)
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow'
      };

      const response = await fetch(`https://et-apiuat.detsandbox.com/${URL}`, requestOptions)

      return {data: await response.json(), statusCode: response.status}
    } catch (error) {
       throw new Error(error)
    }
  },
  post: async (URL, payload) => {
    try {
      myHeaders.append(`Authorization`, `Bearer ${await getToken()}`)
      myHeaders.append("Content-Type", "application/json");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: 'follow'
      }; 

      const response = await fetch(`https://et-apiuat.detsandbox.com/${URL}`, requestOptions)
      return {data: await response.json(), statusCode: response.status}
    } catch (error) {
      throw Error(`Error on POST request: ${URL}, ${error}`)
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

module.exports = httpFetchRequest
