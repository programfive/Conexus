'use client';
import { useConversations } from '@/hooks/use-conversations';
import { useUsers } from '@/hooks/use-users';
import {useConversation} from '@/hooks/use-conversation';
import { FullConversationType } from '@/types';
import { User } from '@prisma/client';
import { useEffect, useMemo, useState } from 'react';
import { Search, UserPlus, UserRoundX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ConversationBox } from './conversation-box';
import { Button } from '@/components/ui/button';
import { GroupChatModal } from './group-chat-modal';
import { H3 } from '@/components/ui/typography';
import { ConversationBoxSkeleton } from '@/components/skeletons/conversation-box';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { pusherClient } from '@/lib/pusher';
import { find } from 'lodash';
import { useCurrentUser } from '@/hooks/use-current-user';
import { useRouter } from 'next/navigation';

interface ConversationListProps {
  initialConversations: FullConversationType[];
  initialUsers: User[];
  currentUser:User;
}

export function ConversationList({
  initialUsers,
  initialConversations,
  currentUser
}: ConversationListProps) {
  const [items, setItems] = useState(initialConversations);

  const { users = [] } = useUsers(initialUsers);
  const { conversationId } = useConversation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();



  const pusherKey = useMemo(() => {
    return currentUser.email;
  }, [currentUser?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) => current.map((currentConversation) => {
        if (currentConversation.id === conversation.id) {
          return {
            ...currentConversation,
            messages: conversation.messages
          }
        }

        return currentConversation;
      }))
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)]
      });

      if (conversationId === conversation.id) {
        router.push('/conversations');
      }
    };

    pusherClient.bind('conversation:new', newHandler);
    pusherClient.bind('conversation:update', updateHandler);
    pusherClient.bind('conversation:remove', removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new', newHandler);
      pusherClient.unbind('conversation:update', updateHandler);
      pusherClient.unbind('conversation:remove', removeHandler);
    }
  }, [pusherKey, conversationId, router]);

  const filteredConversations = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }
    return items.filter((conversation) => {
      if (conversation.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }

      return conversation.users.some((user) =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [items, searchTerm]);

  const skeletonCount = Math.max(initialConversations.length, 5);
  const skeletons = Array(skeletonCount).fill(0);

  return (
    <>
      <aside
        className={cn(
          'fixed lg:z-50 inset-y-0 border-r border-border bg-background lg:block '
        )}
      >
        <div className="flex h-full w-screen lg:w-[28rem] flex-col ">
          <div className="px-4">
            <div className="mb-4 flex items-center justify-between pt-4">
              <H3>Messages</H3>
              <GroupChatModal
                data={users}
                isOpen={isModalOpen}
                onToggleModal={() => setIsModalOpen(!isModalOpen)}
              >
                <Button variant="ghost" asChild size="icon" className="p-2">
                  <UserPlus className="h-10 w-10 shrink-0 text-foreground" />
                </Button>
              </GroupChatModal>
            </div>

            <div className="my-6">
              <Input
                startIcon={Search}
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="w-full  flex-1  overflow-auto  px-4 pb-4">
            <div className="w-full space-y-2">
              {initialConversations.length === 0 ? (
              <div className="flex items-center gap-4 justify-center flex-col h-32">
                <UserRoundX size={64} />
                <H3>There are no conversations</H3>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex items-center gap-4 justify-center flex-col h-32">
              <UserRoundX size={64} />
              <H3>No conversations found</H3>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ConversationBox
              key={conversation.id}
              data={conversation}
              selected={conversationId === conversation.id}
            />
            ))
          )}
            
              
            </div>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}
