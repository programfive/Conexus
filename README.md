# Conexus

![App Mockup](/public/mockup.png)

Conexus is a real-time chat application that allows users to communicate instantly and create groups for collaborative conversations. Additionally, it supports the sending of different types of files, making communication more dynamic and efficient.

## Main Features
- **Real-time chat**: Instant communication between users.
- **Group support**: Creation and management of groups for collaborative conversations.
- **File sending**: Support for sending various types of files (images, documents, etc.).

## Technologies Used
- **Frontend**: Next.js
- **Backend**: Next.js (API Routes)
- **Database**: Prisma with MongoDB
- **Authentication**: Clerk
- **File Upload**: Cloudinary
- **UI Components**: Shadcn
- **Data Revalidation**: SWR
- **Styles**: Tailwind CSS
- **WebSockets**: Pusher

## Prerequisites
To run this project, you need to have the following programs installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (or a cloud instance such as [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

## Installation
Follow these steps to set up and run the project:

1. **Clone the repository**:
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
