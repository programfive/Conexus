'use client';
import {useConversation} from "@/hooks/use-conversation";
import {useRoutes} from "@/hooks/use-routes";
import { MobileItem } from "./mobile-item";
import { LogOut, Moon, Sun } from "lucide-react";
import { Logout } from "../logout";
import { useTheme } from "next-themes";

export function MobileFooter (){
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  if (isOpen) {
    return null;
  }

  return ( 
    <div
      className="fixed  p-4 justify-between w-full bottom-0 z-40 flex items-center bg-background border-t-[1px] lg:hidden
      "
    >
      {routes.map((route) => (
        <MobileItem
          key={route.href}
          href={route.href}
          active={route.active}
          icon={route.icon}
        />
      ))}
        <MobileItem
          icon={theme === 'light' ? Sun : Moon}
          onClick={toggleTheme}
        />
      <Logout>
        <MobileItem
          icon={LogOut}
          
        />
      </Logout>

    </div>
   );
}