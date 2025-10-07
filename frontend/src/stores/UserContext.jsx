import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [nombre, setNombre] = useState('')

  return (
    <UserContext.Provider value={{ nombre, setNombre }}>
      {children}
    </UserContext.Provider>
  )
}