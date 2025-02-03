import { Button } from "@/components/ui/button";
import { Muted, Small } from "@/components/ui/typography";
import { Icon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ImageUploadPreview({
  file,
  onRemove,
}: {
  file?: File | null;
  onRemove?: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      setImageError(false);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!previewUrl || !file) return null;

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="group relative  overflow-hidden rounded-lg border border-border bg-background shadow-sm transition-all hover:shadow-md">
      <div className="absolute right-4 top-4 z-10">
        {onRemove && (
          <Button  variant="ghost" onClick={onRemove}>
            <X />
          </Button>
        )}
      </div>

      <div className="relative my-6 aspect-video max-h-[420px]  w-full overflow-hidden">
        <Image
          src={previewUrl}
          alt={file.name}
          fill
          className={`object-contain  p-2 ${
            imageError ? "opacity-50" : "opacity-100"
          }`}
          onError={() => setImageError(true)}
        />
      </div>

      <div className="border-t bg-accent p-3">
        <div className="flex flex-col items-start gap-1">
          <Small className="truncate w-full">{file.name}</Small>
          <Muted>{formatFileSize(file.size)}</Muted>
        </div>
      </div>
    </div>
  );
}

export default ImageUploadPreview;
