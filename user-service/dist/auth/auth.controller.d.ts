import { ClientProxy } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    private readonly client;
    constructor(authService: AuthService, client: ClientProxy);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        data: any;
    }>;
    login(loginDto: any): Promise<{
        access_token: string;
        user: {
            userId: any;
            email: any;
        };
    }>;
}
