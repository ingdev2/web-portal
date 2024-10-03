import {
  Controller,
  Get,
  Post,
  UploadedFiles,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseInterceptors,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { S3FileUploaderService } from '../services/s3_file_uploader.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AdminRolType } from '../../utils/enums/admin_roles.enum';
import { UserRolType } from '../../utils/enums/user_roles.enum';

@ApiTags('s3-file-uploader')
@ApiBearerAuth()
@Auth(
  AdminRolType.SUPER_ADMIN,
  AdminRolType.ADMIN,
  UserRolType.PATIENT,
  UserRolType.EPS,
  UserRolType.AUTHORIZED_FAMILIAR,
)
@Controller('s3FileUploader')
export class S3FileUploaderController {
  constructor(private readonly s3FileUploaderService: S3FileUploaderService) {}

  @Post('uploadFileToS3')
  @UseInterceptors(
    FilesInterceptor('files', +process.env.MAXIMUM_NUMBER_OF_FILES),
  )
  async uploadFileToS3(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: process.env.FILE_TYPES_ALLOWED,
          }),
          new MaxFileSizeValidator({
            maxSize: +process.env.MAXIMUM_FILE_SIZE_IN_BYTES,
            message: '¡El peso del archivo debe ser menor a 10MB!',
          }),
        ],
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    files: Array<Express.Multer.File>,
  ) {
    return this.s3FileUploaderService.uploadFileToS3(files);
  }

  @Get('/viewFileFromS3')
  async viewFileFromS3(@Query('key') key: string[]) {
    return this.s3FileUploaderService.viewFileFromS3(key);
  }
}
