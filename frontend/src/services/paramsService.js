import api from '../../../services/api'

export const getUserParams = async () => {
  const { data } = await api.get('/user/params')
  return data
}
