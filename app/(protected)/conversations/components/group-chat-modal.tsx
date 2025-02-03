'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { User } from '@prisma/client';
import { Check } from 'lucide-react';
import { Muted, Small } from '@/components/ui/typography';

import { z } from 'zod';
import { MembersSchema } from '@/schemas';
import axios from 'axios';
import { toast } from 'sonner';

import { Avatar } from '@/components/utils/avatar';
import { AvatarGroup } from '@/components/utils/avatar-group';
import { capitalizeWords } from '@/utils/text';


interface GroupChatModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onToggleModal: () => void;
  data?: User[];
  mutate?: () => void;
}

export const GroupChatModal: React.FC<GroupChatModalProps> = ({
  children,
  isOpen,
  onToggleModal,
  data = [],
  mutate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [groupName, setGroupName] = useState('');
  const [errors, setErrors] = useState<{
    name?: string[];
    members?: string[];
  }>({});

  const handleSelect = (user: User) => {
    setSelectedUsers((current) => {
      const exists = current.some((u) => u.id === user.id);
      return exists
        ? current.filter((u) => u.id !== user.id)
        : [...current, user];
    });
    if (errors.members) {
      setErrors((prev) => ({ ...prev, members: undefined }));
    }
  };
  const resetForm = () => {
    setSearch('');
    setSelectedUsers([]);
    setGroupName('');
    setErrors({});
    onToggleModal();
  };
  const filteredUsers = data?.filter((user) => {
    const searchTerms = search.toLowerCase();
    return (
      user.username?.toLowerCase().includes(searchTerms) ||
      user.email?.toLowerCase().includes(searchTerms)
    );
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formattedMembers = selectedUsers.map((user) => ({
      value: user.id,
    }));

    const formData = {
      name: groupName.trim(),
      members: formattedMembers,
      isGroup: true,
    };

    try {
      const validationData = {
        name: formData.name,
        members: selectedUsers.map((user) => user.id),
        isGroup: true,
      };

      MembersSchema.parse(validationData);

      await axios.post('/api/conversations', formData);
      if (mutate) {
        await mutate();
      }
      resetForm();
      toast.success('Group created successfully!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.flatten().fieldErrors);
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onToggleModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a group chat</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium">Group Name</label>
            <Input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-2"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">{errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-medium">Select Members</label>
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4"
            />
            <ScrollArea className="h-44 rounded-md border">
              <div className="p-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => handleSelect(user)}
                    className="flex cursor-pointer items-center space-x-2 rounded-lg p-2 hover:bg-accent"
                  >
                    <Avatar url={user.profilePicture} />
                    <div className="flex-1">
                      <Small className="truncate">
                        {capitalizeWords(user.username!)}
                      </Small>
                      <Muted>{user.email}</Muted>
                    </div>
                    {selectedUsers.some((u) => u.id === user.id) && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            {errors.members && (
              <p className="text-sm text-destructive">{errors.members[0]}</p>
            )}
          </div>

          {selectedUsers.length > 0 && (
            <div className="flex items-center gap-2">
              <AvatarGroup
                avatars={selectedUsers.map((user) => ({
                  name: user.username,
                  image: user.profilePicture,
                }))}
                className="flex-shrink-0"
              />
              <Small className="text-muted-foreground">
                {selectedUsers.length}
                {selectedUsers.length === 1 ? 'member' : 'members'} selected
              </Small>
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              Create Group
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
