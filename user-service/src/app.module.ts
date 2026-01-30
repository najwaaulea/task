import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // <-- Pastikan ini ada
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    // 1. Daftarkan JwtModule agar JwtService bisa digunakan di AuthService
    JwtModule.register({
      global: true, // Membuatnya tersedia di seluruh aplikasi
      secret: 'RAHASIA_SUPER_KUAT', // Ganti dengan secret key kamu
      signOptions: { expiresIn: '3600s' },
    }),

    // 2. Konfigurasi RabbitMQ
    ClientsModule.register([
      {
        name: 'USER_EVENT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'user_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}