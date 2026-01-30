import { ClientProxy } from '@nestjs/microservices';
import { RegisterDto } from './auth/dto/register.dto';
export declare class AuthController {
    private readonly client;
    constructor(client: ClientProxy);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        event: string;
        data: {
            userId: number;
            email: string;
        };
    }>;
}
