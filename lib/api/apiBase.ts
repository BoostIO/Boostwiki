import axios from 'axios'
import configuration from '../../configuration'

export default axios.create({
  baseURL: configuration.baseURL,
  withCredentials: true
})
