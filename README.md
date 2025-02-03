# Conexus

![Mockup de la aplicación](/public/mockup.png)

Conexus es una aplicación de chat en tiempo real que permite a los usuarios comunicarse de manera instantánea y crear grupos para conversaciones colaborativas. Además, soporta el envío de diferentes tipos de archivos, haciendo que la comunicación sea más dinámica y eficiente.

## Características principales
- **Chat en tiempo real**: Comunicación instantánea entre usuarios.
- **Soporte para grupos**: Creación y gestión de grupos para conversaciones colaborativas.
- **Envío de archivos**: Soporte para enviar diferentes tipos de archivos (imágenes, documentos, etc.).

## Tecnologías utilizadas
- **Frontend**: Next.js
- **Backend**: Next.js (API Routes)
- **Base de datos**: Prisma con MongoDB
- **Autenticación**: Clerk
- **Subida de archivos**: Cloudinary
- **Componentes UI**: Shadcn
- **Revalidación de datos**: SWR
- **Estilos**: Tailwind CSS
- **WebSockets**: Pusher

## Requisitos previos
Para ejecutar este proyecto, necesitas tener instalado:
- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (o una instancia en la nube)

## Instalación
Sigue estos pasos para configurar y ejecutar el proyecto:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/programfive/conexus.git
2. Navega al directorio del proyecto:
   ```bash
   cd conexus
3. Instala las dependencias:
   ```bash
   npm install
4. Configura las variables de entorno:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/users"
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/users"
    DATABASE_URL=
    NEXT_PUBLIC_PUSHER_APP_KEY=
    PUSHER_APP_ID=
    PUSHER_SECRET=
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
    NEXT_PUBLIC_CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    MUX_TOKEN_ID=
    MUX_TOKEN_SECRET=
5. Configura la base de datos con Prisma:
    ```bash
    npx prisma generate 
    npx prisma db push
6. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
7. Accede a la aplicación:
   ```bash
   http://localhost:3000

# Licencia MIT

Copyright (c) [2004] [Conexus]
