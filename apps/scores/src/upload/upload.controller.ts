import {
  Controller,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { UploadDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          // new MaxFileSizeValidator({ maxSize: 1000 }),
          // new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadDto?: UploadDto,
  ) {
    return await this.uploadService.upload(
      uploadDto?.fileName || file.originalname,
      uploadDto?.interpretName || '',
      uploadDto?.arrangementName || '',
      uploadDto?.albumName || '',
      uploadDto?.category || null,
      file.buffer,
      file.mimetype,
      uploadDto?.uploadedBy,
      uploadDto?.scoreId,
    );
  }

  @Get()
  getUploads() {
    return this.uploadService.getUplaods();
  }

  @Get(':id')
  async getUpload(@Param('id') id: number) {
    return await this.uploadService.getUpload(id);
  }

  @Get(':id/with-score')
  async getUploadWithScore(@Param('id') id: number) {
    return await this.uploadService.getUploadWithScore(id);
  }

  @Get('user/:userId')
  async getUploadsByUser(
    @Param('userId') userId: number,
  ) {
    return await this.uploadService.getUploadsByUser(userId);
  }

  @Get('score/:scoreId')
  async getUploadsByScore(
    @Param('scoreId') scoreId: number,
  ) {
    return await this.uploadService.getUploadsByScore(scoreId);
  }

  @Delete(':id')
  deleteUploadById(@Param('id') id: string) {
    return this.uploadService.deleteUpload(parseInt(id));
  }
}
