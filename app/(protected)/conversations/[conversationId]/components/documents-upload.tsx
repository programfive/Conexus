import { FileText, X } from "lucide-react";
import {  H4, Muted, Small } from "@/components/ui/typography";

export function DocumentsUploadPreview({
  file,
  onRemove,
}: {
  file?: File | null;
  onRemove?: () => void;
}) {
  if (!file) {
    return null;
  }

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="group relative   rounded-lg border border-border bg-background shadow-sm transition-all hover:shadow-md">
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

      <div className="relative my-6 flex aspect-video max-h-[220px] w-full flex-col items-center justify-center  gap-4 overflow-hidden">
        <FileText className="h-20 w-20  text-muted-foreground sm:h-44 sm:w-44" />
        <H4 className="text-muted-foreground"> No view available</H4>
      </div>

      <div className="border-t bg-accent p-3">
        <div className="flex items-start gap-1 flex-col">
          <Small className="truncate w-full">{file.name}</Small>
          <Muted>{formatFileSize(file.size)}</Muted>
        </div>
      </div>
    </div>
  );
}

export default DocumentsUploadPreview;
