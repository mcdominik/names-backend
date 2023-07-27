import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InquiriesService } from './inquiries.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/users/guards/admin.guard';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly inquiriesService: InquiriesService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  getInquiries() {
    return this.inquiriesService.getInquiries();
  }
}
