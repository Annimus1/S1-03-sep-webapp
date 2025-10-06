# 🚀 Kredia - API Backend
Este repositorio contiene el código fuente de la API backend desarrollada con Node.js, Express, MongoDB, y JWT. La arquitectura sigue un diseño modular con patrones Singleton y Repository para garantizar la escalabilidad y el desacoplamiento.

### 1. Stack Tecnológico 🛠️

|Componente|Tecnología|	Patrón/Detalle|
|--|--|--|
|Lenguaje|	Node.js (ES Modules)||	
|Framework|Express ||	
|Base de Datos|	MongoDB	Mongoose ODM & Database|Singleton|
|Caché/whitelist|	Redis|	CacheSingleton|
|Seguridad|	JWT	Autenticación y Autorización por roles (Admin/user)||
|Testing|	Jest||	
|Documentación|	Swagger (OpenAPI 3.0)	|Generación a través de JSDoc|

### 2. Prerrequisitos 📋

Antes de iniciar el servidor, asegúrate de tener instalado y configurado lo siguiente:

Node.js y npm: (Versión 18+ o superior recomendada).

MongoDB: Una instancia local o remota en ejecución (MongoDB Atlas es una buena opción).

Redis: Una instancia de servidor Redis en ejecución (se utiliza para el caching y la lista negra de JWTs).

### 3. Configuración del Entorno (.env) ⚙️

Copia el archivo de ejemplo .env.example y renómbralo a .env. Rellena las variables de entorno con tus credenciales.

```
# .env.example
# ===============================================
# 1. CONFIGURACIÓN GENERAL DEL SERVIDOR
# ===============================================

# Puerto en el que correrá la aplicación Express (Ej: 3001)
PORT=3001
# URL base de tu API (usada por Swagger y en logs)
API_URL=http://localhost:3001/api/v1
# URL de tu frontend (usada por el middleware CORS)
FRONTEND_URL=http://localhost:3000

# ===============================================
# 2. BASE DE DATOS Y PERSISTENCIA
# ===============================================

# Cadena de conexión a MongoDB (Mongoose)
MONGO_URI=mongodb://localhost:27017/nombre_db_dev
# Cadena de conexión a Redis (CacheSingleton)
REDIS_URI=redis://localhost:6379

# ===============================================
# 3. SEGURIDAD Y AUTENTICACIÓN (JWT)
# ===============================================

# Clave secreta para firmar y verificar los JSON Web Tokens (¡DEBE SER MUY SEGURA!)
# Genera una cadena aleatoria larga (ej: 32 caracteres)
JWT_SECRET=TU_CLAVE_SECRETA_DE_32_CARACTERES_O_MAS

# Tiempo de vida del token de acceso (Ej: 1h, 1d, 30m)
JWT_ACCESS_EXPIRATION_TIME=1h
```

### 4. Inicio del Entorno de Desarrollo (dev) 🚀

Sigue estos pasos para levantar el servidor en modo desarrollo:

#### 4.1. Instalación de Dependencias
Ejecuta el siguiente comando para instalar todos los módulos de Node.js:

```
npm install
```

#### 4.2. Ejecución del Servidor
Utilizaremos un script que reinicie automáticamente el servidor al detectar cambios en el código (usualmente nodemon).

Para iniciar el servidor en modo desarrollo:
```
npm run dev
```

#### 4.3. Verificación de Inicio
Si la configuración es correcta, verás los siguientes mensajes en la consola, indicando el éxito del inicio:

```
🔌 Conectado a MongoDB satisfactoriamente.
⚡ Conectado a Redis satisfactoriamente.
----------------------------------------------------
✨ Servidor Express escuchando en el puerto 3001
🌐 Accede a la API en: http://localhost:3001/api/v1
----------------------------------------------------
⚠️ NOTA: Si el servidor no logra conectarse a MongoDB o Redis, el proceso se detendrá inmediatamente.
```

### 5. Endpoints y Documentación 📚
Una vez que el servidor esté en línea, puedes acceder a la interfaz de documentación Swagger UI para probar los endpoints y ver los modelos de datos.

Recurso	URL
Base de la API	`http://localhost:3001/api/v1`
Documentación Swagger	`http://localhost:3001/api/v1/docs`

#### Rutas Clave de Autenticación:

|Método|	Ruta|	Descripción|
|--|--|--|
|POST|	/api/v1/auth/register |	Registro de nueva entidad empresarial.|
|POST|	/api/v1/auth/login|	Inicia sesión y obtiene el token JWT.|
