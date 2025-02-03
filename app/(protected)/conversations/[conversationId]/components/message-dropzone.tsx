"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { File, FileVideo, X } from "lucide-react";
import Image from "next/image";
import { Icons } from "@/components/ui/icons";
interface DropzoneProps {
  onFileUpload: (file: File) => void;
  children: React.ReactNode;
  onClose: () => void;
  setFilePreview: (file: File | null) => void;
  filePreview: File | null;
  setPreviewUrl: (url: string | null) => void;
  previewUrl: string | null;
}
export const MessageDropzone: React.FC<DropzoneProps> = ({
  onFileUpload,
  children,
  onClose,
  setFilePreview,
  setPreviewUrl,
  previewUrl,
  filePreview,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];
        setFilePreview(newFile);
        onFileUpload(newFile);
        if (newFile.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewUrl(reader.result as string);
          };
          reader.readAsDataURL(newFile);
        } else {
          setPreviewUrl(null);
        }
      }
    },
    [onFileUpload, setFilePreview, setPreviewUrl]
  );

  const handleClearFile = () => {
    setFilePreview(null);
    setPreviewUrl(null);
    onClose();
  };

  const video = [".mp4", ".mp3", ".mov", ".avi"];
  const image = [".jpg", ".jpeg", ".png", ".gif"];
  const pdf = [".pdf"];
  const document = [".doc", ".docx"];

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": image,
      "video/*": video,
      "application/pdf": pdf,
      "application/msword": document,
    },
  });

  const fileExtension = "." + filePreview?.name.split(".").pop();

  return (
    <>
      <div
      >
        {previewUrl && (
          <div className="overflow-hidden rounded-lg">
            <Image
              className="bg-background"
              src={previewUrl}
              alt="Preview image"
              width={300}
              height={300}
            />
          </div>
        )}
        {filePreview && !previewUrl && (
          <div className=" h-24 w-52  overflow-hidden rounded-lg  border border-border bg-accent p-4 shadow-sm dark:bg-background sm:w-64">
            {document.includes(fileExtension!) && (
              <div className="flex h-full items-center gap-2 text-gray-600  dark:text-white">
                <File className="h-12 w-12" />
                <span className="ml-2 truncate text-base text-foreground dark:text-muted-foreground ">
                  {filePreview.name}
                </span>
              </div>
            )}
            {video.includes(fileExtension!) && (
              <div className="flex h-full items-center gap-2 text-gray-600  dark:text-white">
                <FileVideo className="h-12 w-12" />
                <span className="ml-2 truncate text-base text-foreground dark:text-muted-foreground ">
                  {filePreview.name}
                </span>
              </div>
            )}
            {pdf.includes(fileExtension!) && (
              <div className="flex h-full items-center gap-2 text-gray-600  dark:text-white">
                <Icons.pdf className="h-12 w-12" />
                <span className="ml-2 truncate text-base text-foreground dark:text-muted-foreground ">
                  {filePreview.name}
                </span>
              </div>
            )}
          </div>
        )}
        {filePreview && (
          <div className="absolute right-0 top-0 m-2 flex items-center justify-center rounded-full bg-white p-1 dark:bg-background">
            <button onClick={handleClearFile}>
              <X size={20} />
            </button>
          </div>
        )}
      </div>
      <div {...getRootProps()}>
        <input {...getInputProps()} ref={inputRef} />
        {children}
      </div>
    </>
  );
};

