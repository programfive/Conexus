import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle, Users, LogOut, Settings } from 'lucide-react';
import {useConversation} from './use-conversation';
export function useRoutes () {
  const pathname = usePathname();
  const { conversationId } = useConversation();
  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: MessageCircle,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: Users,
        active: pathname === '/users',
      },
      {
        label: 'Setting',
        href: '/setting',
        icon: Settings,
        active: pathname === '/setting',
      },
    ],
    [pathname, conversationId]
  );

  return routes;
};

