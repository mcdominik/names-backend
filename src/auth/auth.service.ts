import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Role, User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getOneByEmail(email);

    if (user && (await compare(password, user.passwordHash))) {
      return { id: user._id, email: user.email };
    }

    return null;
  }

  async login(user: User) {
    const payload = { sub: user._id, email: user.email };

    return {
      email: user.email,
      token: this.jwtService.sign(payload),
    };
  }
}
