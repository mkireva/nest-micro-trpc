import { IsString, IsNumber, IsOptional, IsNotEmpty, IsUrl, IsDateString } from 'class-validator';

export class UploadDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fileName?: string;

  @IsOptional()
  @IsString()
  interpretName?: string;

  @IsOptional()
  @IsString()
  arrangementName?: string;

  @IsOptional()
  @IsString()
  albumName?: string;

  @IsOptional()
  @IsString()
  mimeType?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  @IsString()
  s3Key?: string;

  @IsOptional()
  @IsString()
  s3Bucket?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  s3Url?: string;

  @IsOptional()
  @IsNumber()
  uploadedBy?: number;

  @IsOptional()
  @IsNumber()
  scoreId?: number;

  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @IsOptional()
  @IsDateString()
  updatedAt?: Date;
}
