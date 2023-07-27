import { Injectable, UseGuards } from '@nestjs/common';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import {
  Inquiry,
  InquiryDocument,
  InquirySchema,
} from './entities/inquiry.entity';
import { Model } from 'mongoose';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectModel(Inquiry.name) private inquireModel: Model<InquiryDocument>,
  ) {}

  async getInquiries() {
    return this.inquireModel.find();
  }

  async createInquiry(dto: CreateInquiryDto) {
    return this.inquireModel.create(dto);
  }
}
