import axios from 'axios'
import { API_HOST } from './constant'

/**
 * @param {object} param
 * @param {'get' | 'post' | 'delete' =} param.method
 * @param {string} param.url
 * @param {object=} param.params
 * @param {object=} param.data
 * @param {object=} param.headers
 */
export default function callApi({
  method = 'get',
  url,
  params,
  data,
  headers,
}) {
  return axios({
    url,
    method,
    baseURL: API_HOST,
    headers: {
      'X-AUTH-TOKEN': sessionStorage.getItem('jwt'),
      ...headers,
    },
    params,
    data,
    witchCredentials: true,
  }).then(response => {
    return response.data
  })
}
