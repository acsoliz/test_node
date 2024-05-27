# Red Social de Personas que Adoran a los Perros

API REST desarrollada con Node.js y Express.js para gestionar una red social de personas que adoran a los perros. Los usuarios pueden registrarse, actualizar su perfil, eliminar su cuenta y establecer relaciones de amistad.

## Requisitos

- Node.js v14 o superior
- npm (Node Package Manager)

## Instalación

1. Clona el repositorio en tu máquina local:

   git clone https://github.com/acsoliz/mi-red-social.git

2. Navega al directorio del proyecto:

   cd mi-red-social

3. Instala las dependencias del proyecto:

   npm install

4. Inicializa la base de datos:

   npm run init-db

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:

npm start

El servidor estará disponible en http://localhost:3000.

## Endpoints

- Registrar Usuario

  - URL: /register
  - Método: POST
  - Cuerpo de la Solicitud:
    Ejemplo para el hemisferio norte:
    {
    "username": "usuario_norte",
    "email": "email_norte@ejemplo.com",
    "password": "contraseña_segura",
    "latitude": 40.4168, // Latitud de Madrid, España
    "longitude": -3.7038, // Longitud de Madrid, España
    "browser_language": "es"
    }
    Ejempplo para el hemisferio sur:
    {
    "username": "usuario_sur",
    "email": "email_sur@ejemplo.com",
    "password": "contraseña_segura",
    "latitude": -33.8688, // Latitud de Sídney, Australia
    "longitude": 151.2093, // Longitud de Sídney, Australia
    "browser_language": "es"
    }

- Obtener Usuarios

  - URL: /users
  - Método: GET

- Actualizar Usuario

  - URL: /users/:id
  - Método: PUT
  - Cuerpo de la Solicitud:
    {
    "username": "nombre_de_usuario_actualizado",
    "email": "email_actualizado@ejemplo.com",
    "password": "contraseña_segura_actualizada",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "browser_language": "es"
    }

- Eliminar Usuario

  - URL: /users/:id
  - Método: DELETE

- Listado de Amigos de un Usuario

  - URL: /users/:id/friends
  - Método: GET

- Contador de Amigos de un Usuario
  - URL: /users/:id/friends/count
  - Método: GET
