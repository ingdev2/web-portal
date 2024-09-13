import { Module } from '@nestjs/common';
import { S3FileUploaderService } from './services/s3_file_uploader.service';
import { S3FileUploaderController } from './controllers/s3_file_uploader.controller';

@Module({
  controllers: [S3FileUploaderController],
  providers: [S3FileUploaderService],
  exports: [S3FileUploaderService],
})
export class S3FileUploaderModule {}
