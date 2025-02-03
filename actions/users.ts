import { db } from "@/lib/db";
import { User } from "@prisma/client";
import { getCurrentUser } from "./current-user";

export const getUserById = async (clerkUserId: string): Promise<User | null> => {
  if (!clerkUserId) return null
  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId,
      },
    });
    return user;
  } catch (error) {
    console.error('[Database Error]:', error);
    return null;
  }
};
export const  getUsers = async(): Promise<User[] | null>=>{
    const user = await getCurrentUser();
    
    try {
      const users = await db.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          NOT: {
            email: user?.email,
          },
        },
      });
      return users;
    } catch(error) {
      console.error('[Database Error]:', error);
      return [];
    }
  }