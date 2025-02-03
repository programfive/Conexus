'use server'
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@prisma/client";

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const clerkUser = await currentUser();
    
    if (!clerkUser?.id) {
      return null;
    }
    const currentUserDatabase = await db.user.findUnique({
      where: {
        clerkUserId: clerkUser.id,
      },
    });
    return currentUserDatabase;
  } catch (error) {
    console.error('[Authentication Error]:', error);
    return null
  }
};