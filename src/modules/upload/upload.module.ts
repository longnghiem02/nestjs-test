import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controller';
import { imageFileFilter } from './file.filter';

@Module({
  imports: [
    MulterModule.register({
      dest: 'src/upload/image/',
      fileFilter: imageFileFilter,
    }),
  ],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
