import { Injectable, Inject } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { DATABASE_CONNECTION } from '../database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import * as uploadSchema from './schema';
import * as scoreSchema from '../scores/schema';
import * as userSchema from '../users/schema';

const schema = {
  ...uploadSchema,
  ...scoreSchema,
  ...userSchema,
};

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(DATABASE_CONNECTION)
    private readonly database: NodePgDatabase<typeof schema>,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
    this.bucketName = this.configService.get('AWS_S3_BUCKET', 'scores-upload');
  }

  async upload(
    fileName: string,
    interpretName: string,
    arrangementName: string,
    albumName: string,
    category: string | null,
    file: Buffer,
    mimeType: string,
    uploadedBy?: number,
    scoreId?: number,
  ) {
    const s3Key = `${Date.now()}-${fileName}`;
    const s3Url = `https://${this.bucketName}.s3.${this.configService.getOrThrow('AWS_S3_REGION')}.amazonaws.com/${s3Key}`;

    // Upload to S3
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: s3Key,
        Body: file,
        ContentType: mimeType,
      }),
    );

    // Store metadata in database
    const [uploadRecord] = await this.database
      .insert(schema.uploads)
      .values({
        fileName,
        interpretName,
        arrangementName,
        albumName,
        category,
        mimeType,
        fileSize: file.length,
        s3Key,
        s3Bucket: this.bucketName,
        s3Url,
        uploadedBy,
        scoreId,
      })
      .returning();

    return uploadRecord;
  }

  async getUplaods() {
    return this.database.query.uploads.findMany({
      with: {
        user: true,
      },
    });
  }

  async getUpload(id: number) {
    const [upload] = await this.database
      .select()
      .from(schema.uploads)
      .where(eq(schema.uploads.id, id));

    return upload;
  }

  async getUploadsByUser(userId: number) {
    return await this.database
      .select()
      .from(schema.uploads)
      .where(eq(schema.uploads.uploadedBy, userId));
  }

  async getUploadsByScore(scoreId: number) {
    return await this.database
      .select()
      .from(schema.uploads)
      .where(eq(schema.uploads.scoreId, scoreId));
  }

  async getUploadWithScore(uploadId: number) {
    return await this.database.query.uploads.findFirst({
      where: eq(schema.uploads.id, uploadId),
      with: {
        score: true,
        user: true,
      },
    });
  }

  async deleteUpload(id: number) {
    const [deletedUpload] = await this.database
      .delete(schema.uploads)
      .where(eq(schema.uploads.id, id))
      .returning();

    return deletedUpload;
  }
}
