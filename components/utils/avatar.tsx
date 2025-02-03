'use client';
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

interface AvatarProps {
  url: string | null;
  isGroup?: boolean;
  isLarge?: boolean;
}
export function Avatar({ url, isGroup, isLarge }: AvatarProps) {
  return (
    <AvatarComponent
      className={cn(
        'flex  items-center justify-center',
        isLarge && 'h-44 w-44'
      )}
    >
      <AvatarImage className=" object-cover" src={url!} />
      <AvatarFallback className="bg-gray-300 text-white  ">
        {isGroup ? (
          <Icons.users className={cn(isLarge ? 'h-32 w-32' : 'h-6 w-6')} />
        ) : (
          <Icons.user className={cn(isLarge ? 'h-32 w-32' : 'h-6 w-6')} />
        )}
      </AvatarFallback>
    </AvatarComponent>
  );
}