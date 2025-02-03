'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft } from 'lucide-react';

export function ConversationHeaderSkeleton() {
  return (
    <div className="flex w-full items-center justify-between border-b border-border bg-background p-4 sm:px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <div className="block cursor-pointer text-sky-500 transition hover:text-sky-600 lg:hidden">
          <ChevronLeft size={32} />
        </div>

        <Skeleton className="h-12 w-12 rounded-full" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <Skeleton className="h-8 w-8" />
    </div>
  );
}
