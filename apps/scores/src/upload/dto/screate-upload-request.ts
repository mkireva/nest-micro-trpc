export class CreateUploadRequest {
    fileName: string;
    mimeType: string;
    fileSize: number; // in bytes
    s3Key: string; // S3 object key
    s3Bucket: string;
    s3Url: string; // Full S3 URL
    uploadedBy?: number; // Optional since it references users.id
    createdAt?: Date;
    updatedAt?: Date;
}
