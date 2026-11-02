import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    data: RegisterDto,
  ): Promise<{ id: string; name: string; email: string }> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      name: data.name,
      email: data.email,
      passwordHash,
    });

    return { id: user.id, name: user.name, email: user.email };
  }

    async login(data: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(data.email);
    const passwordMatches = user
      ? await bcrypt.compare(data.password, user.passwordHash)
      : false;

    if (!user || !passwordMatches) {
      throw new UnauthorizedException('Email o password incorrectos.');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }

}
