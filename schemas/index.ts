import { MAX_FILE_SIZES } from "@/constants/file";
import * as z from "zod";
export const MembersSchema = z.object({
  name: z
    .string()
    .min(1, "Group name is required")
    .max(50, "Group name cannot exceed 50 characters"),
  members: z
    .array(z.string())
    .min(2, "Please select at least 2 members")
    .max(50, "Maximum number of members exceeded"),
  isGroup: z.boolean().optional(),
});


export const MembersUploadAvatar = z.object({
  avatar: z
    .any()
    .refine((files) => files?.length > 0, "Image is required.")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZES.image, "Max file size is 16MB.")
    .refine(
      (files) =>
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          files[0]?.type
        ),
      "Only JPEG, PNG and WebP files are allowed."
    ),
});