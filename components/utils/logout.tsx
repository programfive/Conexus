'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useClerk } from '@clerk/clerk-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface LogoutProps {
  children: React.ReactNode;
}

export function Logout({ children }: LogoutProps) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <div onClick={() => setIsLogoutDialogOpen(true)}>
        {children}
      </div>
      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will log you out of your account. You will need to sign in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Log Out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}