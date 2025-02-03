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

    Navigate to the project directory:

cd conexus

Install the dependencies:

npm install
# or if you prefer using Yarn:
yarn install

Configure the environment variables:

Create a .env.local file in the root of the project and add the following environment variables. Make sure to replace the key values with your actual configuration data:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL="/users"
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL="/users"
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?retryWrites=true&w=majority"
NEXT_PUBLIC_PUSHER_APP_KEY=<your-pusher-app-key>
PUSHER_APP_ID=<your-pusher-app-id>
PUSHER_SECRET=<your-pusher-secret>
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
MUX_TOKEN_ID=<your-mux-token-id>
MUX_TOKEN_SECRET=<your-mux-token-secret>

    Clerk: You will need your Clerk keys for authentication.
    MongoDB: Make sure you have your MongoDB connection URL (this can be from MongoDB Atlas).
    Pusher: Set up Pusher keys to enable WebSocket functionality.
    Cloudinary: Used for file uploads (images and other file types).
    Mux: Used for video upload and processing.

Set up the database with Prisma:

Generate and push the Prisma schema to your MongoDB database:

npx prisma generate
npx prisma db push

Start the development server:

To run the application locally, use the following command:

npm run dev
# or with Yarn:
yarn dev

Access the application:

Open your browser and go to the following URL to see the application in action:

http://localhost:3000

# Licencia MIT

Copyright (c) 2004 Conexus