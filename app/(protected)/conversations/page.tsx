'use client';
import { EmptyState } from '@/components/utils/empty-state';
import {useConversation} from '@/hooks/use-conversation';

import { cn } from '@/lib/utils';
function ConversationPage() {
  const { isOpen } = useConversation();
  return (
    <div
      className={cn('h-full min-h-screen place-content-center pl-[28rem] lg:block ', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  );
}
export default ConversationPage;