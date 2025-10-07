import React, { useContext } from 'react'
import { UserContext } from '../../../stores/UserContext'


const RegisterPage = () => {
  const { nombre } = useContext(UserContext)

  return <h2>Bienvenido a Registro, {nombre || 'desconocido'} 👋</h2>
}

export default RegisterPage
