import api from '../../../services/api'

export const loginUser = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

export const registerUser = async (userData) => {
  const { data } = await api.post('/auth/register', userData)
  return data
}
