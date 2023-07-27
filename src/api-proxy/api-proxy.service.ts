import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { NationalizeApiResponse } from './models/nationalize.api-response';
import { GenderizeApiResponse } from './models/genderize.api-response';
import { CombinedApiResponse } from './models/combined.api-response';

@Injectable()
export class ApiProxyService {
  async getNationalityFromName(name: string): Promise<NationalizeApiResponse> {
    try {
      const response = await axios.get(
        `https://api.nationalize.io/?name=${name}`,
      );

      const constructedResponse: NationalizeApiResponse = {
        data: {
          count: response.data.count,
          name: response.data.name,
          country: response.data.country.map((country: any) => ({
            country_id: country.country_id,
            probability: country.probability,
          })),
        },
      };

      return constructedResponse;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getGenderFromName(name: string): Promise<GenderizeApiResponse> {
    try {
      const response = await axios.get(
        `https://api.genderize.io/?name=${name}`,
      );
      const constructedResponse: GenderizeApiResponse = {
        data: {
          gender: response.data,
        },
      };

      return constructedResponse;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getInformationsFromName(name: string): Promise<CombinedApiResponse> {
    const nationalizeApiResponse = await this.getNationalityFromName(name);
    const genderizeApiResponse = await this.getGenderFromName(name);
    return {
      nationalizeApiResponse,
      genderizeApiResponse,
    };
  }
}
