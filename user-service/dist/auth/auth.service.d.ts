import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    private users;
    register(data: any): Promise<any>;
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            userId: any;
            email: any;
        };
    }>;
}
