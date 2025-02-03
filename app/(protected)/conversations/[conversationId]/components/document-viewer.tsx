import { P, Small } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/utils/fornat";
import { FileIcon } from "lucide-react";
import { format } from "date-fns";
interface DocumentViewerProps {
  url: string;
  name: string;
  size: number;
  isOwn?: boolean;
  createdAt?: Date;
  type: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  url,
  name,
  size,
  isOwn,
  createdAt,
}) => {
  const handleDownload = () => {
    window.open(url, "_blank");
  };
  return (
    <div
      className={cn(
        isOwn ? "rounded-br-none bg-primary" : "rounded-bl-none bg-accent",
        "flex cursor-pointer items-center gap-4 rounded-none  p-4 "
      )}
      onClick={handleDownload}
    >
      <div
        className={cn(
          isOwn ? "bg-purple-400" : "bg-gray-200",
          "flex h-14 w-14 items-center  justify-center rounded-full "
        )}
      >
        <FileIcon className="h-6 w-6 " />
      </div>
      <div className="flex min-w-0  max-w-[16rem] flex-col gap-2 ">
        <P className="truncate ">{name}</P>
        <div className="flex w-full  items-center justify-between gap-2">
          <Small className="font-normal">{formatFileSize(size)}</Small>
          <Small className="font-normal">{format(new Date(createdAt!), "p")}</Small>
        </div>
       
      </div>
    </div>
  );
};

export default DocumentViewer;
