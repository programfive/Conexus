'use client';

import { Conversation, User } from '@prisma/client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, MoreHorizontal } from 'lucide-react';

import useOtherUser from '@/hooks/use-other-user';

import { ProfileDrawer } from './profile-drawer';
import { P, Small } from '@/components/ui/typography';


import { ConversationHeaderSkeleton } from '@/components/skeletons/conversation-header';
import { useConversationById } from '@/hooks/use-conversation-by-id';
import { Avatar } from '@/components/utils/avatar';
import { capitalizeWords } from '@/utils/text';

interface HeaderProps {
  conversationId: string;
}

export function Header({ conversationId }: HeaderProps) {
  const {
    conversationById,
    mutateConversationById,
    isLoadingConversationById,
  } = useConversationById(conversationId);
  console.log('conversation', conversationById);
  const otherUser = useOtherUser(conversationById!);
  // const { members } = useActiveList();
  // const isActive = members.indexOf(otherUser?.email!) !== -1;
  const isActive = true;

  const statusText = useMemo(() => {
    if (conversationById?.isGroup) {
      return `${conversationById?.users?.length} members`;
    }

    return isActive ? 'Active' : 'Offline';
  }, [conversationById, isActive]);

  return (
    <>
      {isLoadingConversationById ? (
        <ConversationHeaderSkeleton />
      ) : (
        <div
          className="flex w-full items-center justify-between border-b border-border bg-background p-4 sm:px-4 lg:px-6
  "
        >
          <div className="flex items-center gap-3">
            <Link
              className="block cursor-pointer text-foreground transition hover:text-accent lg:hidden"
              href="/conversations"
            >
              <ChevronLeft size={32} />
            </Link>
            {conversationById?.isGroup ? (
              <Avatar url={conversationById?.image} isGroup />
            ) : (
              <Avatar url={otherUser?.profilePicture!} />
            )}
            <div className="flex flex-col">
              <P className="font-semibold">
                {capitalizeWords(
                  conversationById?.name || otherUser?.username || 'Unnamed'
                )}
              </P>
              <Small className="font-normal text-muted-foreground">
                {statusText}
              </Small>
            </div>
          </div>
          <ProfileDrawer
            muted={mutateConversationById}
            data={conversationById!}
          >
            <MoreHorizontal
              size={32}
              className="cursor-pointer text-foreground transition hover:text-accent"
            />
          </ProfileDrawer>
        </div>
      )}
    </>
  );
}
