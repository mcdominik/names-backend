import { Controller, Get, Param } from '@nestjs/common';
import { ApiProxyService } from './api-proxy.service';
import { InquiriesService } from 'src/inquiries/inquiries.service';

@Controller('api-proxy')
export class ApiProxyController {
  constructor(
    private readonly apiProxyService: ApiProxyService,
    private readonly inquiriesService: InquiriesService,
  ) {}

  @Get('/:name')
  async getInformationsFromName(@Param('name') name: string) {
    const combinedApiResponse =
      await this.apiProxyService.getInformationsFromName(name);

    await this.inquiriesService.createInquiry({
      name,
      combinedApiResponse,
    });

    return combinedApiResponse;
  }
}
