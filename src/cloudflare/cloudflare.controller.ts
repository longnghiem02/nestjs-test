import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudflareService } from './cloudflare.service';

@Controller('upload')
export class CloudflareController {
  constructor(private readonly cloudflareService: CloudflareService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    const url = await this.cloudflareService.uploadFile(file);
    return url;
  }
}
