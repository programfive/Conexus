import { Skeleton } from "@/components/ui/skeleton";

export const ConversationBoxSkeleton = () => {
  return (
    <div className="relative flex max-w-[20.5rem] items-center space-x-3 rounded-md  pt-2">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="min-w-0 flex-1 border-b border-border pb-4">
        <div className="focus:outline-none">
          <div className="mb-1 flex items-center justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-3 w-[50px]" />
          </div>
          <Skeleton className="mt-2 h-3 w-[200px]" />
        </div>
      </div>
    </div>
  );
};
