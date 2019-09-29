import axios from 'axios'

const client = axios.create({
  baseURL: process.env.API_URL,
  json: true
})

export default {
  async execute (method, url, data) {
    return client({
      method,
      url: url,
      data
    }).then(req => {
      return req.data
    })
  },
  get (url) {
    return this.execute('get', url)
  },
  post (url, data) {
    return this.execute('post', url, data)
  }
}