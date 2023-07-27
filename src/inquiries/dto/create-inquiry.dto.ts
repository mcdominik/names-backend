import { CombinedApiResponse } from 'src/api-proxy/models/combined.api-response';

export class CreateInquiryDto {
  name: string;
  combinedApiResponse: CombinedApiResponse;
}
