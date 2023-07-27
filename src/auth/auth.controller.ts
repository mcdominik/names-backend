import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Param,
  BadRequestException,
} from '@nestjs/common';
import {
  CreateUserDto,
  CreateUserDtoFromFrontend,
} from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    const user = await this.usersService.getOneByEmail(req.user.email);
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDtoFromFrontend) {
    const user = await this.usersService.createUser(dto);
    return await this.authService.login(user);
  }
}
