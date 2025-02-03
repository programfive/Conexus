import { auth } from "@clerk/nextjs/server";
import { currentUser } from '@clerk/nextjs/server';
import { db } from "@/lib/db";
import { User } from "@prisma/client";

export const checkUser = async (): Promise<User | null> => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return null;
    }

    const user = await currentUser();
    if (!user) {
      return null;
    }

    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (loggedInUser) return loggedInUser;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        username:user.username,
        profilePicture: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.error('[Authentication Error]:', error);
    return null;
  }
}