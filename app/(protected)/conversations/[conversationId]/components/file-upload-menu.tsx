import {
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileText, Image, Video, Plus } from "lucide-react";
export function FileUploadMenu({
  onUpload,
}: {
  onUpload: (type: string) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Plus size={30} className="text-gray-800 dark:text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 mb-6 w-40 rounded-md bg-background shadow-md">
        <DropdownMenuLabel>Upload files</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onUpload("documents")}>
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpload("photo")}>
            <Image className="mr-2 h-4 w-4" />
            Photos
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onUpload("video")}>
            <Video className="mr-2 h-4 w-4" />
            Video
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
