import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './auth/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_EVENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Simulasi simpan ke database
    const userId = Math.floor(Math.random() * 1000);
    
    const userData = {
      userId,
      email: registerDto.email,
    };

    // MENGIRIM PESAN ASYNC KE RABBITMQ
    this.client.emit('user.created', userData);

    return {
      message: 'User successfully registered',
      event: 'user.created',
      data: userData,
    };
  }
}