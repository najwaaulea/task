import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject('USER_EVENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Panggil service untuk simpan data
    const user = await this.authService.register(registerDto);

    // Kirim event ke RabbitMQ
    this.client.emit('user.created', user);

    return {
      message: 'User successfully registered',
      data: user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}