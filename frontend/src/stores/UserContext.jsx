import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("data");
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("data");
      }
    } catch (error) {
      console.error("⚠️ Error al leer usuario del localStorage:", error);
      localStorage.removeItem("data");
    }
  }, []);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("data", JSON.stringify(user));
      } else {
        localStorage.removeItem("data");
      }
    } catch (error) {
      console.error("⚠️ Error al guardar usuario en localStorage:", error);
    }
  }, [user]);

  // 🚀 Nuevo logout que llama al backend
  const logout = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const response = await fetch("http://localhost:3001/api/v1/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.warn("⚠️ Error al cerrar sesión:", errorData.message);
        } else {
          console.log("Sesión cerrada correctamente en el servidor.");
        }
      }
    } catch (error) {
      console.error("❌ Error en la solicitud de logout:", error);
    } finally {
      // 🧹 Limpieza local (se ejecuta siempre)
      setUser(null);
      localStorage.removeItem("data");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("welcomeMessageShown");
      localStorage.removeItem("creditoSeleccionado");
      //localStorage.removeItem("creditInfo");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};