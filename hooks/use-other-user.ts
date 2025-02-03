import { useMemo } from 'react';
import { User } from '@prisma/client';
import { useCurrentUser } from './use-current-user';
import { FullConversationType } from '@/types';

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const { user } = useCurrentUser();

  const otherUser = useMemo(() => {
    const currentUserEmail = user?.email;
    
    if (!currentUserEmail || !conversation?.users) {
      return null;
    }

    const otherUsers = conversation.users.filter(
      (user: User) => user.email !== currentUserEmail
    );

    return otherUsers[0] || null;
  }, [user?.email, conversation?.users]);

  return otherUser;
};

export default useOtherUser;