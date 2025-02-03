export const ALLOWED_IMAGE_TYPES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp'
  ];
  
  export const ALLOWED_DOCUMENT_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
    'application/vnd.ms-excel', 
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    'application/vnd.ms-powerpoint', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
    'text/plain', 
    'application/zip',
    'application/x-zip-compressed'
  ];
  
  export const ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/3gpp',
    'video/quicktime' 
  ];
  
  export const MAX_FILE_SIZES = {
    image: 16 * 1024 * 1024, // 16MB
    video: 128 * 1024 * 1024, // 128MB
    document: 100 * 1024 * 1024 // 100MB
  };