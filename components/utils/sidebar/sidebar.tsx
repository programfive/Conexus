
"use client";
import { useCurrentUser } from '@/hooks/use-current-user';
import { DesktopSidebar } from './desktop-sidebar';
import { MobileFooter } from './mobile-footer';

export function Sidebar({ children }: { children: React.ReactNode }) {
  const {user} =  useCurrentUser();
  return (
    <section className="h-full">
      <DesktopSidebar currentUser={user!} />
      <MobileFooter />
      <main className="h-full lg:pl-20">{children}</main>
    </section>
  );
}
