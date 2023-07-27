import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CombinedApiResponse } from 'src/api-proxy/models/combined.api-response';

@Schema()
export class Inquiry {
  @Prop()
  name: string;

  @Prop()
  combinedApiResponse: CombinedApiResponse;
}

export type InquiryDocument = HydratedDocument<Inquiry>;
export const InquirySchema = SchemaFactory.createForClass(Inquiry);
