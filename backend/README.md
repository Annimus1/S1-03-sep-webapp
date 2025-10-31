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
PORT=3000
# URL base de tu API (usada por Swagger y en logs)
API_URL=http://localhost:3001/api/v1
# URL de tu frontend (usada por el middleware CORS)
FRONTEND_URL=http://localhost:3001

# ===============================================
# 2. BASE DE DATOS Y PERSISTENCIA
# ===============================================

# Cadena de conexión a MongoDB (Mongoose)

MONGO_URI=mongodb://mongodb:27017/nombre_db_dev
# Cadena de conexión a Redis (CacheSingleton)
REDIS_URI=redis://redis:6379

MONGO_TEST_URI=mongodb://mongodb:27017/nombre_db_dev_test
REDIS_TEST_URI=redis://redis:6379


# ===============================================
# 3. SEGURIDAD Y AUTENTICACIÓN (JWT)
# ===============================================

# Clave secreta para firmar y verificar los JSON Web Tokens (¡DEBE SER MUY SEGURA!)
# Genera una cadena aleatoria larga (ej: 32 caracteres)
JWT_SECRET=TU_CLAVE_SECRETA_DE_32_CARACTERES_O_MAS

# Tiempo de vida del token de acceso (Ej: 1h, 1d, 30m)
JWT_ACCESS_EXPIRATION_TIME=1h

# ===============================================
# 4. SERVICIOS DE TERCEROS (BUCKET)
# ===============================================

# SUPABASE
SUPABASE_PROJECT_URL=url_del_proyecto
SUPABASE_API_KEY=api_key
SUPABASE_S3_ACCESS_KEY_ID=S3_key_id
SUPABASE_S3_SECRET_KEY=Secret_Key_s3
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

# Docker Stack: Node.js + MongoDB + Redis

Esta guía contiene los comandos básicos para trabajar con Docker, MongoDB y Redis.

> **Nota:** si el comando `docker compose` no les funciona puede intentar probar con `docker-compose`

## 📦 Comandos Docker

### Iniciar los contenedores
```bash
# Construir e iniciar todos los servicios
docker compose up --build

# Iniciar en segundo plano (detached mode)
docker compose up -d

# Iniciar solo un servicio específico
docker compose up mongodb
```

### Detener los contenedores
```bash
# Detener todos los servicios
docker compose down

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker compose down -v

# Detener sin eliminar contenedores
docker compose stop
```

### Ver logs
```bash
# Ver logs de todos los servicios
docker compose logs

# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f app
docker compose logs -f mongodb
docker compose logs -f redis
```

### Estado de los contenedores
```bash
# Ver contenedores en ejecución
docker compose ps

# Ver todos los contenedores (incluso detenidos)
docker ps -a
```

### Correr los test
```bash
docker compose run --rm app npm test
```

## 🍃 Comandos MongoDB

### Acceder al shell de MongoDB
```bash
# Opción 1: Usando docker compose
docker compose exec mongodb mongosh

# Opción 2: Usando docker directamente
docker exec -it mongodb mongosh
```

### Comandos básicos dentro de MongoDB
```javascript
// Ver todas las bases de datos
show dbs

// Usar/crear una base de datos
use myapp

// Ver colecciones de la base de datos actual
show collections

// Crear una colección e insertar datos
db.users.insertOne({ name: "Juan", email: "juan@example.com" })

// Insertar múltiples documentos
db.users.insertMany([
  { name: "María", email: "maria@example.com" },
  { name: "Pedro", email: "pedro@example.com" }
])

// Buscar documentos
db.users.find()
db.users.find({ name: "Juan" })
db.users.findOne({ email: "juan@example.com" })

// Actualizar documentos
db.users.updateOne(
  { name: "Juan" },
  { $set: { age: 30 } }
)

// Eliminar documentos
db.users.deleteOne({ name: "Juan" })

// Contar documentos
db.users.countDocuments()

// Ver base de datos actual
db.getName()

// Eliminar una colección
db.users.drop()

// Eliminar la base de datos actual
db.dropDatabase()

// Salir de mongosh
exit
```

## 🔴 Comandos Redis

### Acceder al CLI de Redis
```bash
docker compose exec redis redis-cli

```

### Comandos básicos dentro de Redis
```bash
# Establecer un valor
SET nombre "Juan"
SET edad 30

# Obtener un valor
GET nombre

# Establecer con expiración (en segundos)
SETEX session:123 3600 "user_data"

# Verificar si una clave existe
EXISTS nombre

# Eliminar una clave
DEL nombre

# Ver todas las claves
KEYS *

# Ver tiempo de vida restante (en segundos)
TTL session:123

# Establecer tiempo de expiración a una clave existente
EXPIRE edad 60

# Incrementar un valor numérico
INCR contador
INCRBY contador 5

# Decrementar un valor numérico
DECR contador
DECRBY contador 3

# Trabajar con listas
LPUSH tareas "tarea1"
RPUSH tareas "tarea2"
LRANGE tareas 0 -1
LPOP tareas

# Trabajar con conjuntos (sets)
SADD tags "nodejs" "docker" "mongodb"
SMEMBERS tags
SREM tags "docker"

# Trabajar con hashes
HSET usuario:1 nombre "Juan" edad 30
HGET usuario:1 nombre
HGETALL usuario:1
HDEL usuario:1 edad

# Limpiar toda la base de datos actual
FLUSHDB

# Limpiar todas las bases de datos de Redis
FLUSHALL

# Ver información del servidor Redis
INFO

# Salir del CLI
exit
```

## 🔧 Comandos Útiles Adicionales

### Reiniciar un servicio específico
```bash
docker compose restart app
docker compose restart mongodb
docker compose restart redis
```

### Acceder al contenedor con bash/sh
```bash
# Node.js (usa sh porque es Alpine)
docker compose exec app sh

# MongoDB
docker compose exec mongodb bash

# Redis
docker compose exec redis sh
```

### Ver uso de recursos
```bash
docker stats
```

### Limpiar recursos de Docker
```bash
# Eliminar contenedores detenidos
docker container prune

# Eliminar imágenes no utilizadas
docker image prune

# Eliminar volúmenes no utilizados
docker volume prune

# Limpiar todo (⚠️ cuidado)
docker system prune -a
```

### Reconstruir un servicio específico
```bash
docker compose build app
docker compose up -d --no-deps --build app
```


## 🔗 Variables de Entorno en la Aplicación

Puedes acceder a las variables definidas en docker compose.yml desde tu código Node.js:

```javascript
const mongoUri = process.env.MONGODB_URI;
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
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