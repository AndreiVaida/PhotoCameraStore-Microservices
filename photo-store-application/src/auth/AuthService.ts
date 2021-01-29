import { Injectable } from '@nestjs/common';
import { UsersService } from './UsersService';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      console.log(`√ User ${username} authorized.`);
      const { password, ...result } = user;
      return result;
    }
    console.log(`✗ User ${username} not authorized.`);
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}
