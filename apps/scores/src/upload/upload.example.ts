// Example usage of the Upload Service

/*
1. Upload a file with metadata:
POST /upload
Content-Type: multipart/form-data

Form data:
- file: [your file]
- uploadedBy: 1 (optional - user ID)
- scoreId: 5 (optional - score ID)

Response:
{
  "id": 1,
  "fileName": "score.pdf",
  "mimeType": "application/pdf",
  "fileSize": 1024000,
  "s3Key": "1642678901234-score.pdf",
  "s3Bucket": "scores-upload",
  "s3Url": "https://scores-upload.s3.eu-central-1.amazonaws.com/1642678901234-score.pdf",
  "uploadedBy": 1,
  "scoreId": 5,
  "createdAt": "2025-01-19T10:30:00Z",
  "updatedAt": "2025-01-19T10:30:00Z"
}

2. Get a specific upload:
GET /upload/1

3. Get all uploads by a user:
GET /upload/user/1

4. Get all uploads for a score:
GET /upload/score/5

*/

// Service usage in other parts of your application:
/*
import { UploadService } from './upload/upload.service';

// In your service constructor:
constructor(private readonly uploadService: UploadService) {}

// Upload a file programmatically:
const uploadResult = await this.uploadService.upload(
  'document.pdf',
  fileBuffer,
  'application/pdf',
  userId, // optional
  scoreId  // optional
);

// Get upload metadata:
const upload = await this.uploadService.getUpload(uploadId);
const userUploads = await this.uploadService.getUploadsByUser(userId);
const scoreUploads = await this.uploadService.getUploadsByScore(scoreId);
*/
