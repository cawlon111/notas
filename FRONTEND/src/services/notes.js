import axios from 'axios'
const baseUrl = '/api/notes'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then(response => {
      return response.data
    })
    .catch(error => {
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
  const request = axios.post(baseUrl, newObject)
  const response = await request
  return response.data
}

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

// ✅ NUEVA función para eliminar una nota
const deleteNote = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default {
  getAll,
  create,
  update,
  deleteNote,  // ← Añadir esta línea
}