import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import clsx from 'clsx';
import { useSession } from '@clerk/nextjs';


import { cn } from '@/lib/utils';

import { Muted, P, Small } from '@/components/ui/typography';
import { Avatar } from '@/components/utils/avatar';
import { capitalizeWords } from '@/utils/text';
import useOtherUser from '@/hooks/use-other-user';
import { FullConversationType } from '@/types';

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

export const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
  const otherUser = useOtherUser(data);
  const { session } = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session?.user?.emailAddresses[0].emailAddress;
  }, [session?.user?.emailAddresses[0].emailAddress]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.typeFile === 'video') {
      return 'Sent a video ';
    }
    if (lastMessage?.typeFile === 'image') {
      return 'Sent an image';
    }
    if (lastMessage?.typeFile === 'document') {
      return 'Sent a document';
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        ` relative flex w-full cursor-pointer items-center space-x-3 rounded-md px-2 pt-2 transition hover:bg-accent 
      `,
        selected ? 'bg-accent' : 'bg-background'
      )}
    >
      {data.isGroup ? (
        <Avatar url={data.image} isGroup />
      ) : (
        <Avatar url={otherUser?.profilePicture!} />
      )}
      <div className=" border-b border-border  w-full pb-4 ">
        <div className=" focus:outline-none">
          <div className="flex items-center justify-between truncate">
            <P className="font-semibold">
              {capitalizeWords(data.name || otherUser?.username || 'Unnamed')}
            </P>
            {lastMessage?.createdAt && (
              <Muted className="font-normal">
                {format(new Date(lastMessage.createdAt), 'p')}
              </Muted>
            )}
          </div>
          <Small
            className={cn(
              'max-w-[20.5rem] truncate font-normal ',
              hasSeen ? ' text-muted-foreground' : 'font-medium text-foreground'
            )}
          >
            {lastMessageText}
          </Small>
        </div>
      </div>
    </div>
  );
};
