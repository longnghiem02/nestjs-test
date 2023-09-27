import { Module } from '@nestjs/common';
import { CloudflareService } from './cloudflare.service';
import { CloudflareController } from './cloudflare.controller';

@Module({
  imports: [],
  controllers: [CloudflareController],
  providers: [CloudflareService],
})
export class CloudflareModule {}
