import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Definisikan tipe datanya di sini (gunakan 'any' jika ingin cepat, 
  // atau buat interface untuk lebih rapi)
  private users: any[] = []; 

  async register(data: any) {
    // Sekarang .push(data) tidak akan error lagi
    const newUser = {
      userId: Math.floor(Math.random() * 9999),
      ...data
    };
    this.users.push(newUser);
    return newUser;
  }

  async login(email: string, pass: string) {
    // Karena users sekarang any[], u.email tidak akan dianggap 'never'
    const user = this.users.find(u => u.email === email);
    
    if (!user || user.password !== pass) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = { sub: user.userId, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        userId: user.userId,
        email: user.email
      }
    };
  }
}