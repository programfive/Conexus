
import { getCurrentUser } from "@/actions/current-user";
import { ConversationList } from "./components/conversation-list";
import { getConversations } from "@/actions/get-conversations";
import { getUsers } from "@/actions/users";
import { Sidebar } from "@/components/utils/sidebar/sidebar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const initialUsers = await getUsers();
  const currentUser = await getCurrentUser();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList 
          initialUsers={initialUsers!} 
          initialConversations={conversations}
          currentUser={currentUser!}
        />
        {children}
      </div>
    </Sidebar>
  );
}