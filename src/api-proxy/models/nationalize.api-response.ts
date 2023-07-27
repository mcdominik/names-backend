export interface NationalizeApiResponse {
  data?: {
    count: number;
    name: string;
    country: {
      country_id: string;
      probability: number;
    }[];
  };
  error?: string;
}
