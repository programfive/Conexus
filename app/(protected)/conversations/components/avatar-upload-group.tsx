'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';

import { cn } from '@/lib/utils';
import { MembersUploadAvatar } from '@/schemas';


import { Conversation } from '@prisma/client';
import { uploadToCloudinary } from '@/services/upload-cloudinary';
import { MAX_FILE_SIZES } from '@/constants/file';
import { Avatar } from '@/components/utils/avatar';

interface AvatarUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: Conversation;
  muted: () => void;
}

export function AvatarUploadGroup({
  isOpen,
  onOpenChange,
  data,
  muted,
}: AvatarUploadDialogProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof MembersUploadAvatar>>({
    resolver: zodResolver(MembersUploadAvatar),
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        form.setValue('avatar', [file]);
      }
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: MAX_FILE_SIZES.image,
    multiple: false,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setPreview(null);
    form.reset();
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  async function onSubmit(values: z.infer<typeof MembersUploadAvatar>) {
    try {
      setIsLoading(true);
      const file = values.avatar[0];

      const uploadResult = await uploadToCloudinary(file);

      await axios.put(`/api/conversations/${data.id}`, {
        conversationId: data.id,
        avatarUrl: uploadResult.url,
      });
      muted();
      toast.success('Avatar updated successfully');
      onOpenChange(false);
      removeFile();
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error('Failed to update avatar');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Avatar</DialogTitle>
          <DialogDescription>
            Choose an image to use as your avatar. Max file size is 16MB.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-8"
          >
            <div className="flex flex-col items-center justify-center">
              <div
                {...getRootProps()}
                className={cn(
                  'relative flex h-44 w-44 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 transition-colors',
                  isDragActive && 'border-blue-500 bg-blue-50',
                  isLoading && 'opacity-50'
                )}
              >
                <input {...getInputProps()} disabled={isLoading} />
                {preview ? (
                  <>
                    <div className="relative h-full w-full">
                      <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="rounded-full object-cover"
                        sizes="11rem"
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30">
                           O
                        </div>
                      )}
                    </div>
                    {!isLoading && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile();
                        }}
                        className="absolute -bottom-2 right-4 rounded-full  p-2 text-white"
                      >
                        <Trash className="h-6 w-6" />
                      </button>
                    )}
                  </>
                ) : (
                  <Avatar url={data.image} isLarge isGroup />
                )}
              </div>
              {form.formState.errors.avatar && (
                <p className="mt-2 text-sm text-red-500">
                  {form.formState.errors.avatar.message as string}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!selectedFile || isLoading}
            >
              Upload Avatar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
