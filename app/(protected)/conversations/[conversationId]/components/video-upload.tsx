"use client";
import { X } from "lucide-react";
import { Muted, Small } from "@/components/ui/typography";

import Player from "@/components/ui/player";
import { formatFileSize } from "@/utils/fornat";

export function VideoUploadPreview({
  file,
  onRemove,
}: {
  file?: File | null;
  onRemove?: () => void;
}) {
  if (!file) return null;

  const videoUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="group relative  overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all hover:shadow-md">
      <div className="absolute right-4 top-4 z-10">
        {onRemove && (
          <div className="rounded-md bg-background p-2 hover:bg-accent">
            <X
              onClick={onRemove}
              className="h-6 w-6 cursor-pointer text-gray-600 hover:text-foreground"
            />
          </div>
        )}
      </div>

      <div className="mx-auto my-6 flex max-h-[650px] w-full max-w-[650px]  items-center justify-center ">
        <Player src={videoUrl!} />
      </div>

      <div className="border-t bg-accent p-3">
        <div className="flex flex-col items-start gap-1">
          <Small className="w-full truncate">{file.name}</Small>
          <Muted>{formatFileSize(file.size)}</Muted>
        </div>
      </div>
    </div>
  );
}

export default VideoUploadPreview;
