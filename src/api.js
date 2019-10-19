import axios from 'axios'

const client = axios.create({
  baseURL: process.env.API_URL,
  json: true
})

export default {
  async execute (method, url, data, headers) {
    return client({
      method,
      url: url,
      data,
      headers
    }).then(req => {
      return req.data
    })
  },
  get (url, headers) {
    return this.execute('get', url, null, headers)
  },
  post (url, data) {
    return this.execute('post', url, data)
  }
}