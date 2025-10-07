import React, { useContext } from 'react'
import { UserContext } from '../../../stores/UserContext'


const LoginPage = () => {
  const { nombre } = useContext(UserContext)

  return <h2>Bienvenido a Login, {nombre || 'desconocido'} 👋</h2>
}

export default LoginPage
