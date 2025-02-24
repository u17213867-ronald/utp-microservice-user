import { Injectable } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { TokenServiceRepository } from "../../domain/interfaces/token.service.interface";

@Injectable()
export class TokenService implements TokenServiceRepository {
    private readonly saltRounds: number = 10;
    constructor(
        private readonly jwtService: JwtService,
    ) {}
    // Encriptar contraseña
    async generate(date: any): Promise<string> {
        const payload = { id: date.id, role: date.role };
        return this.jwtService.sign(payload);
    }

    // Verificar contraseña
    async decrypt(token: string): Promise<any> {
        const response = this.jwtService.decode(token);
        return response;
    }
}
