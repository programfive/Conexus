import axios from "axios";
import { toast } from "sonner";


const FOLDER_TYPES = {
  IMAGE: "images",
  VIDEO: "videos",
  DOCUMENT: "documents",
} as const;

type FileType = "image" | "video" | "document";

interface CloudinaryUploadResponse {
  name: string;
  url: string;
  publicId: string;
  resourceType: FileType;
  size: number;
}

const getFileType = (file: File): FileType => {
  if (file.type.startsWith("image/")) {
    return "image";
  } else if (file.type.startsWith("video/")) {
    return "video";
  } else {
    return "document";
  }
};

const getFolderPath = (fileType: FileType, conversationId?: string) => {
  const baseFolder = "chat-uploads";
  const typeFolder = FOLDER_TYPES[fileType.toUpperCase() as keyof typeof FOLDER_TYPES];
  
  if (conversationId) {
    return `${baseFolder}/${typeFolder}/${conversationId}`;
  }
  
  return `${baseFolder}/${typeFolder}`;
};

export const uploadToCloudinary = async (file: File, conversationId?: string): Promise<CloudinaryUploadResponse> => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const fileType = getFileType(file);
    const folder = getFolderPath(fileType, conversationId);

    const paramsToSign = {
      timestamp,
      folder,
    };

    const {
      data: { signature },
    } = await axios.post("/api/cloudinary/sign", {
      paramsToSign,
    });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp.toString());
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append("folder", folder);

    const resourceType = fileType === "video" ? "video" : "auto";

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      formData
    );
    
    return {
      name: response.data.original_filename,
      url: response.data.secure_url,
      publicId: response.data.public_id,
      resourceType: fileType,
      size: response.data.bytes
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    toast.error("Error uploading file");
    throw error;
  }
};