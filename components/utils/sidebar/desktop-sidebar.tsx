'use client';

import { useState } from 'react';
import { DesktopItem } from './desktop-item';
import { User } from '@prisma/client';
import { Avatar } from '../avatar';
import { useRoutes } from '@/hooks/use-routes';
import { Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Logout } from '@/components/utils/logout';


interface DesktopSidebarProps {
  currentUser: User;
}

export function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <div
        className="hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] bg-background lg:pb-4 xl:px-6"
      >
        <nav className="mt-4 h-full items-center flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
              />
            ))}
          </ul>
          <ul>
            <DesktopItem
              label="Toggle Theme"
              icon={theme === 'light' ? Sun : Moon}
              onClick={toggleTheme}
            />
            <Logout>
              <DesktopItem
                label="Logout"
                icon={LogOut}
              />
            </Logout>
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col items-center justify-between">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition hover:opacity-75"
          >
            <Avatar url={currentUser?.profilePicture!} />
          </div>
        </nav>
      </div>
    </>
  );
}