"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
import { useRef, useState, useCallback } from "react";

import {useConversation} from "@/hooks/use-conversation";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { MessageInput } from "./message-input";
import { ImageUploadPreview } from "./image-upload";
import { DocumentsUploadPreview } from "./documents-upload";
import { VideoUploadPreview } from "./video-upload";

import { toast } from "sonner";
import { EmojiDropdown } from "./emoji-dropdown";
import { FileUploadMenu } from "./file-upload-menu";
import {
  isValidFileType,
  validateFileSize,
  validateFileType,
} from "@/utils/validation-files";

import axios from "axios";
import { uploadToCloudinary } from "@/services/upload-cloudinary";
import { ALLOWED_DOCUMENT_TYPES, ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES, MAX_FILE_SIZES } from "@/constants/file";

export const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const [file, setFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      handleFileValidation(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": ALLOWED_IMAGE_TYPES,
      "application/*": ALLOWED_DOCUMENT_TYPES,
      "video/*": ALLOWED_VIDEO_TYPES,
    },
    maxFiles: 1,
    multiple: false,
    noClick: true,
  });

  const handleFileValidation = (selectedFile: File) => {
    const fileType = validateFileType(selectedFile);
    const isValidSize = validateFileSize(
      selectedFile,
      fileType,
      MAX_FILE_SIZES
    );

    if (!isValidSize) {
      toast.error("The file exceeds the maximum allowed size");
      return;
    }

    if (!isValidFileType(fileType)) {
      toast.error("File type not allowed");
      return;
    }
    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileUpload = (type: string) => {
    if (fileInputRef.current) {
      switch (type) {
        case "documents":
          fileInputRef.current.accept = ALLOWED_DOCUMENT_TYPES.join(",");
          break;
        case "photo":
          fileInputRef.current.accept = ALLOWED_IMAGE_TYPES.join(",");
          break;
        case "video":
          fileInputRef.current.accept = ALLOWED_VIDEO_TYPES.join(",");
          break;
        default:
          fileInputRef.current.accept = "";
      }
      fileInputRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      handleFileValidation(selectedFile);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!file && !data.message.trim()) return null;

    try {
      setIsLoading(true);
      let fileCloudinary = null;
      if (file) {
        fileCloudinary = await uploadToCloudinary(file);
      }
      
      const response = await axios.post("/api/messages", {
        message: data.message,
        fileName: fileCloudinary?.name,
        file: fileCloudinary?.url,
        fileType: fileCloudinary?.resourceType,
        fileSize: fileCloudinary?.size,
        conversationId,
      });
      console.log("response de la data ", response);

      if (response.statusText === "OK") {
        setInputValue("");
        setFile(null);
      }
      setInputValue("");
      removeFile();
      setValue("message", "");

      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("Error sending message");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative  bottom-0 flex w-full items-center gap-2 border bg-background p-4 lg:gap-4">
      <div {...getRootProps()} className="w-full">
        <input {...getInputProps()} />

        {file && (
          <div className="absolute bottom-20 left-0 z-40 w-full px-4">
            {ALLOWED_IMAGE_TYPES.includes(file.type) && (
              <ImageUploadPreview file={file} onRemove={removeFile} />
            )}
            {ALLOWED_DOCUMENT_TYPES.includes(file.type) && (
              <DocumentsUploadPreview file={file} onRemove={removeFile} />
            )}
            {ALLOWED_VIDEO_TYPES.includes(file.type) && (
              <VideoUploadPreview file={file} onRemove={removeFile} />
            )}
          </div>
        )}

        <div className="flex w-full items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
            multiple={false}
          />
          <FileUploadMenu onUpload={handleFileUpload} />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full items-center gap-2 lg:gap-4"
          >
            <MessageInput
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
              id="message"
              register={register}
              errors={errors}
              placeholder={
                isDragActive ? "Drop files here..." : "Write a message..."
              }
              value={inputValue}
            />

            <Button
              type="submit"
              disabled={isLoading || (!file && !inputValue.trim())}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin w-6 h-6 "/>
                </div>
              ) : (
                <Send size={18} />
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
