import { GenderizeApiResponse } from './genderize.api-response';
import { NationalizeApiResponse } from './nationalize.api-response';

export class CombinedApiResponse {
  nationalizeApiResponse?: NationalizeApiResponse;
  genderizeApiResponse?: GenderizeApiResponse;
}
