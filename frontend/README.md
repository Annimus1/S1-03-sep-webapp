## 🚀 Tecnologías principales

* **React 18+** – Librería principal para construir interfaces.
* **Vite** – Entorno de desarrollo rápido y liviano.
* **React Router DOM** – Manejo de rutas y navegación entre páginas.
* **React Context API** – Gestión de estado global de la aplicación.
* **Axios** – Cliente HTTP para la comunicación con el backend.
* **ESLint** – Reglas de estilo y buenas prácticas de código.
* **CSS Modules** – Estilos locales y encapsulados por componente.

---

## 🧠 Arquitectura general: Screaming Architecture

La **Screaming Architecture** busca que la estructura del proyecto “grite” de qué trata la aplicación.
En lugar de organizar el código por tipo de archivo (por ejemplo, `/components`, `/hooks`), aquí se organiza **por características o dominios**.

Esto permite:

* Separar responsabilidades por áreas de la app.
* Mejorar la escalabilidad.
* Facilitar la comprensión del código a nuevos desarrolladores.

Cada módulo representa un **dominio funcional independiente**, y contiene sus propias **páginas, hooks, servicios, estilos y estados**.

---

## ⚛️ Atomic Design

Para la construcción de componentes visuales se utiliza la metodología **Atomic Design**, que divide los componentes en niveles jerárquicos:

| Nivel          | Descripción                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------- |
| **Átomos**     | Componentes básicos e indivisibles (botones, inputs, iconos).                                     |
| **Moléculas**  | Combinaciones simples de átomos que forman una unidad funcional (campos de formulario).           |
| **Organismos** | Conjuntos más complejos que combinan moléculas y átomos (modales, tarjetas, secciones completas). |

---

## 🧩 Integraciones principales

### 🧭 React Router DOM

Se utiliza para gestionar la navegación entre páginas y módulos.
Todas las rutas se configuran en `App.jsx` para mantener la estructura modular del proyecto.

Ejemplo:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './modules/home/pages/HomePage'
import LoginPage from './modules/auth/pages/LoginPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

---

### 🧠 React Context API

Se emplea para el manejo de **estado global**, por ejemplo, mantener los datos del usuario logueado o el tema visual de la app.
Los contextos se almacenan dentro de la carpeta `stores/` de cada módulo o en `src/globals/` si son compartidos.

Ejemplo:

```jsx
import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
```

---

### 🌐 Axios

Se utiliza para realizar las peticiones HTTP al backend.
La configuración global se encuentra en `src/services/api.js`, donde se define una instancia de Axios con interceptores para el manejo automático del token de autenticación.

Ejemplo:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.tuapp.com',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
```

---

## 📁 Estructura del proyecto

```plaintext
public/
│
├── vite.svg # Icono del proyecto
│
src/
│
├── globals/ # Configuraciones y contextos globales compartidos
│
├── components/ # Componentes visuales (Atomic Design)
│   ├── atomos/
│   │   ├── Button.jsx # Botón reutilizable
│   │   └── Input.jsx # Campo de texto reutilizable
│   │
│   ├── moleculas/
│   │   └── FormControl.jsx # Combinación de Input + Label
│   │
│   └── organismos/
│       └── Modal.jsx # Componente de modal genérico
│
├── hooks/ # Hooks reutilizables
│   ├── useFetch.js # Hook para peticiones HTTP
│   ├── useLocalStorage.js # Manejo de datos persistentes
│   └── useTheme.js # Cambio de tema dark/light
│
├── layouts/
│   └── MainLayout.jsx # Estructura base (header, footer, etc.)
│
├── utils/
│   ├── formatDate.js # Formatea fechas
│   └── resizeImages.js # Ajusta tamaños de imágenes
│
├── services/
│   └── api.js # Cliente global Axios (configuración HTTP)
│
├── modules/
│   ├── auth/ # Módulo de autenticación
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── authService.js
│   │   ├── styles/
│   │   │   └── auth.module.css
│   │   └── authStore.js
│   │
│   └── home/
│       ├── pages/
│       │   └── HomePage.jsx
│       ├── services/
│       │   ├── paramsService.js # Peticiones relacionadas al usuario
│       │   └── endpoints.js # URLs de la API
│       ├── stores/
│       │   └── UserContext.jsx # Contexto global del usuario
│       └── styles/
│
├── styles/ # Estilos globales o temas
│
├── App.jsx # Configuración principal (rutas, contextos)
├── main.jsx # Punto de entrada de React
│
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

---