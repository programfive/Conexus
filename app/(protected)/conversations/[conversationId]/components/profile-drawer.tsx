import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Trash2 } from 'lucide-react';
import { Conversation, User } from '@prisma/client';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from './confirm-modal';
import useOtherUser from '@/hooks/use-other-user';
import { H3, Large, P, Small } from '@/components/ui/typography';
import { capitalizeWords } from '@/utils/text';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/utils/avatar';
import { GroupContent } from '../../components/group-content';

interface ProfileDrawerProps {
  children: React.ReactNode;
  data: Conversation & {
    users: User[];
  };
  muted: () => void;
}

export function ProfileDrawer({ children, data, muted }: ProfileDrawerProps) {
  const otherUser = useOtherUser(data);
  const [openModal, setOpenModal] = useState(false);

  const joinedDate = useMemo(() => {
    if (!otherUser?.createdAt) return ''; // Evita errores si la fecha no es válida
    return format(new Date(otherUser.createdAt), 'PP');
  }, [otherUser?.createdAt]);

  const title = ''; // Define el título según sea necesario
  const isActive = true;

  const statusText = useMemo(() => {
    if (data?.isGroup) {
      return `${data?.users?.length} Members`;
    }
    return isActive ? 'Active' : 'Offline';
  }, [data, isActive]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0">
        <div className="flex h-full flex-col">
          <SheetTitle className="scroll-m-20 px-6 py-4 font-bold">
            {data?.isGroup ? 'Group Information' : 'Contact Information'}
          </SheetTitle>
          <ScrollArea className="flex-1">
            <div className="flex h-full flex-col px-6 py-4">
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  {data?.isGroup ? (
                    <GroupContent muted={muted} data={data} />
                  ) : (
                    <Avatar isLarge url={otherUser?.profilePicture!} />
                  )}
                </div>
                <Large className="text-center">{title}</Large>
                <Small className="mt-2 text-muted-foreground">
                  {statusText}
                </Small>
                <div className="my-4 w-full py-5 sm:px-0 sm:pt-0">
                  <div className="space-y-4 sm:space-y-6">
                    {data?.isGroup && (
                      <div>
                        <Large>Members</Large>
                        <dd className="mt-2">
                          {data?.users?.map((user) => (
                            <div
                              key={user.id}
                              className="flex items-center gap-2 p-2"
                            >
                              <Avatar url={user.profilePicture} />
                              <div className="mx-2">
                                <P className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold">
                                  {capitalizeWords(user.username!)}
                                </P>
                                <Small className="text-muted-foreground">
                                  {user.email}
                                </Small>
                              </div>
                            </div>
                          ))}
                        </dd>
                      </div>
                    )}
                    {!data?.isGroup && (
                      <div className="space-y-2">
                        <Large className="text-2xl font-bold text-neutral-800 dark:text-white">
                          Information
                        </Large>
                        <div className="space-y-2">
                          <P className="text-foreground">Email</P>
                          <Small className="text-muted-foreground">
                            {otherUser?.email}
                          </Small>
                        </div>
                      </div>
                    )}
                    {!data?.isGroup && (
                      <div>
                        <dt className="font-medium text-foreground">
                          Joined
                        </dt>
                        <dd className="mt-1 text-sm text-muted-foreground">
                          <time dateTime={joinedDate}>{joinedDate}</time>
                        </dd>
                      </div>
                    )}
                  </div>
                </div>

                <div className="self-start">
                  <ConfirmModal
                    isOpen={openModal}
                    setOpenModal={() => setOpenModal(!openModal)}
                  >
                    <Button variant="destructive">
                      <Trash2 className="mr-2" />
                      <span>Delete</span>
                    </Button>
                  </ConfirmModal>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}