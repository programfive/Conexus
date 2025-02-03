"use client";


import { Muted, P, Small } from "@/components/ui/typography";
import { capitalizeWords, isOnlyEmoji } from "@/utils/text";
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types";
import { useSession } from "@clerk/nextjs";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

import { DocumentViewer } from "./document-viewer";
import { ImagePreview } from "./image-preview";
import { Play } from "lucide-react";
import VideoPreview from "./video-preview";
import { Avatar } from "@/components/utils/avatar";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const { session } = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [videModalOpen, setVideoModalOpen] = useState(false);

  const isOwn =
    session?.user?.emailAddresses[0].emailAddress === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.username)
    .join(", ");

  const isEmojiText = isOnlyEmoji(data.body!);

  const container = cn("flex gap-3  p-4 z-10", isOwn && "justify-end");
  const avatar = cn("flex items-end justify-end", isOwn && "order-2");
  const body = cn("flex flex-col   gap-2", isOwn && "items-end");
  const message = cn(
    " overflow-hidden  bg-red-500 rounded-md ",
    isOwn
      ? " bg-primary text-primary-foreground rounded-br-none"
      : "bg-muted rounded-bl-none",
    data.file ? " p-0" : "py-2 px-3",
    isEmojiText && "bg-background rounded-br-none"
  );
  console.log(data.file!)
  const renderFile = () => {
    switch (data.typeFile) {
      case "image":
        return (
          <div className="relative w-full max-w-sm">
            <ImagePreview
              isOpen={imageModalOpen}
              onClose={() => setImageModalOpen(!imageModalOpen)}
              imageUrl={data.file!}
            />
            <div>
              <img
                onClick={() => setImageModalOpen(true)}
                alt="Image"

                src={data.file!}
                className="w-full  cursor-pointer object-cover transition hover:scale-110"
              />
              {!data.body && (
                <span className="absolute bottom-0 right-0 p-2 text-foreground">
                  {format(new Date(data.createdAt), "p")}
                </span>
              )}
            </div>
            {renderMessageBody()}
          </div>
        );

      case "video":
        return (
          <div className="relative max-w-[250px]">
            <VideoPreview
              videoUrl={data.file!}
              isOpen={videModalOpen}
              onClose={() => setVideoModalOpen(!videModalOpen)}
            />
            <div className="relative">
              <video className="rounded-lg" src={data.file!}>
                Your browser does not support the video tag.
              </video>

              <div
                onClick={() => setVideoModalOpen(true)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 p-4 transition-transform hover:scale-110 hover:opacity-50"
              >
                <Play size={24} />
              </div>
              {!data.body && (
                <span className="absolute bottom-0 right-0 p-2 text-foreground">
                  {format(new Date(data.createdAt), "p")}
                </span>
              )}
            </div>

            {renderMessageBody()}
          </div>
        );

      case "document":
        return (
          <DocumentViewer
            url={data.file!}
            name={data.nameFile!}
            size={data.sizeFile!}
            isOwn={isOwn}
            type={data.typeFile}
            createdAt={data.createdAt}
          />
        );

      default:
        return renderMessageBody();
    }
  };

  const renderMessageBody = () => {
    if (!data.body) return null;

    return (
      <div className="flex  w-full max-w-md flex-col gap-1 break-words  p-2  ">
        <P className={cn(isEmojiText && "text-7xl")}>{data.body}</P>
        {isEmojiText && (
          <Small
            className={cn(
              "mt-2 p-2 font-normal",
              isOwn
                ? "rounded-md rounded-br-none  bg-primary"
                : "bg-accent text-accent-foreground"
            )}
          >
            {format(new Date(data.createdAt), "p")}
          </Small>
        )}
        <Small
          className={cn(
            "font-normal",
            isEmojiText && "hidden",
            isOwn ? "text-accent" : "text-accent-foreground"
          )}
        >
          {format(new Date(data.createdAt), "p")}
        </Small>
      </div>
    );
  };

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar url={data.sender.profilePicture!} />
      </div>
      <div className={body}>
        <div className={message}>
          {data.file ? renderFile() : renderMessageBody()}
        </div>
        <div className="flex items-center gap-1">
          <Muted>{capitalizeWords(data.sender.username!)}</Muted>
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <Muted>{`Seen by ${capitalizeWords(seenList)}`}</Muted>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
