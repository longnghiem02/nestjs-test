import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { cloudflareConfig } from 'src/configs/app.config';

@Injectable()
export class CloudflareService {
  private apiUrl = `https://${cloudflareConfig.account}.r2.cloudflarestorage.com`;
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: cloudflareConfig.region,
      endpoint: this.apiUrl,
      credentials: {
        accessKeyId: cloudflareConfig.access_key_id,
        secretAccessKey: cloudflareConfig.secret_access_key,
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const newFilename = file.fieldname + '-' + Date.now();
    const s3Params = {
      Body: file.buffer,
      Bucket: cloudflareConfig.bucket,
      Key: newFilename,
      contentType: file.mimetype,
    };
    const command = new PutObjectCommand(s3Params);
    await this.s3.send(command);

    return `${this.apiUrl}/${cloudflareConfig.bucket}/${newFilename}`;
  }
}
