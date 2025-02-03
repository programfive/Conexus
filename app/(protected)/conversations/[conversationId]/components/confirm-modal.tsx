import React, { useCallback, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

// import { AlertTriangle } from 'lucide-react';

import axios from 'axios';
import { toast } from 'sonner';
// import { Button } from '@/components/ui/button';+

import {useConversation} from '@/hooks/use-conversation';

interface ConfirmModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setOpenModal: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  children,
  isOpen,
  setOpenModal,
}) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        setOpenModal();
        router.push('/conversations');
        router.refresh();
      })
      .catch(() => toast.error('Something went wrong!'))
      .finally(() => setIsLoading(false));
  }, [conversationId, router, setOpenModal]);
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpenModal}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you want to delete this conversation?
          </AlertDialogTitle>

          <AlertDialogDescription>
            {
              "Before proceeding with deleting this conversation, we want to remind you that this action will be irreversible. Once you delete the conversation, you won't be able to recover it."
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading} onClick={setOpenModal}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
