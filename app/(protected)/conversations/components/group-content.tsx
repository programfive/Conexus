'use client';


import { Conversation, User } from '@prisma/client';
import { Camera, Upload, Trash, Eye } from 'lucide-react';
import { useState } from 'react';
import { AvatarUploadGroup } from './avatar-upload-group';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar } from '@/components/utils/avatar';

interface GroupContentProps {
  image?: string;
  data: Conversation & {
    users: User[];
  };
  muted: () => void;
}
export function GroupContent({ data, muted }: GroupContentProps) {
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  return (
    <div className="group relative">
      <Avatar url={data.image} isLarge isGroup />
      <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
        <AvatarUploadGroup
          isOpen={isOpenUpload}
          onOpenChange={setIsOpenUpload}
          data={data}
          muted={muted}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex flex-col items-center">
              <Camera className="mb-1 h-6 w-6" />
              <span className="text-sm">Upload</span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>Edit Avatar</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer hover:bg-accent">
              <Eye className="mr-2 h-4 w-4" /> Show
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsOpenUpload(!isOpenUpload)}
              className="cursor-pointer hover:bg-accent"
            >
              <Upload className="mr-2 h-4 w-4" /> Upload
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-accent">
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
