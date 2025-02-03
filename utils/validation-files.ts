import { ALLOWED_DOCUMENT_TYPES, ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES } from "@/constants/file";

interface MaxFileSizes {
  image: number;
  video: number;
  document: number;
}

export const validateFileType = (file: File): {
  isValidImage: boolean;
  isValidDocument: boolean;
  isValidVideo: boolean;
} => {
  return {
    isValidImage: ALLOWED_IMAGE_TYPES.includes(file.type),
    isValidDocument: ALLOWED_DOCUMENT_TYPES.includes(file.type),
    isValidVideo: ALLOWED_VIDEO_TYPES.includes(file.type)
  };
};

export const validateFileSize = (
  file: File,
  fileType: {
    isValidImage: boolean;
    isValidDocument: boolean;
    isValidVideo: boolean;
  },
  maxFileSizes: MaxFileSizes
): boolean => {
  if (fileType.isValidImage) {
    return file.size <= maxFileSizes.image;
  } 
  if (fileType.isValidVideo) {
    return file.size <= maxFileSizes.video;
  }
  if (fileType.isValidDocument) {
    return file.size <= maxFileSizes.document;
  }
  return false;
};

export const isValidFileType = (fileType: {
  isValidImage: boolean;
  isValidDocument: boolean;
  isValidVideo: boolean;
}): boolean => {
  return fileType.isValidImage || fileType.isValidDocument || fileType.isValidVideo;
};