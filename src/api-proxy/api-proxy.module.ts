import { Module } from '@nestjs/common';
import { ApiProxyService } from './api-proxy.service';
import { ApiProxyController } from './api-proxy.controller';
import { InquiriesModule } from 'src/inquiries/inquiries.module';

@Module({
  imports: [InquiriesModule],
  controllers: [ApiProxyController],
  providers: [ApiProxyService],
})
export class ApiProxyModule {}
