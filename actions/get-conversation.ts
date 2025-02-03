import { db } from "@/lib/db";
import { getCurrentUser } from "./current-user";


const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    return conversation;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export default getConversationById;
