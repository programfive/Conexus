import { db } from '@/lib/db';

export const addUserToDatabase = async (clerkUserId: string, name: string, email: string, image: string) => {
  try {
    const user = await db.user.upsert({
      where: { clerkUserId },
      update: {
        name,
        email,
        image
      },
      create: {
        clerkUserId,
        name,
        email,
        image
      },
    });
    return user;
  } catch (error) {
    console.error("Error adding user to database:", error);
    throw error;
  }
};

export const getUserFromDatabase = async (clerkUserId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { clerkUserId }
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user from database:", error);  
    throw error;
  }
};