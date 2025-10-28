import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  // 1. NUEVO: Estado para saber si la carga inicial ha terminado
  const [isLoading, setIsLoading] = useState(true) 

  useEffect(() => {
    // 2. Lee los datos
    const storedUser = localStorage.getItem("data")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    // 3. Indica que la carga INICIAL ha terminado
    setIsLoading(false) 
  }, [])

  useEffect(() => {
    // Solo guarda si la carga inicial terminó (para no sobrescribir)
    if (!isLoading) { 
        if (user) {
          localStorage.setItem("data", JSON.stringify(user))
        } else {
          localStorage.removeItem("data")
        }
    }
  }, [user, isLoading]) // dependencia de isLoading para el primer login/logout

  const logout = () => {
    setUser(null)
    // El useEffect se encargará de removerlo si isLoading es false
  }
  
  // 4. Incluye isLoading en el value
  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}
