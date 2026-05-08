import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error('Error fetching notes:', error)
      return [
        {
          id: 10000,
          content: 'Esta nota no está guardada en el servidor',
          important: true,
        },
      ]
    })
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : null }
  }
  const request = axios.post(baseUrl, newObject, config)
  const response = await request
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : null }
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then((response) => response.data)
}

const deleteNote = async (id) => {
  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : null }
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  deleteNote,
  setToken
}