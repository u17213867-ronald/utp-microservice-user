import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { PasswordServiceRepository } from './../../domain/interfaces/password.service.repository';

@Injectable()
export class PasswordService implements PasswordServiceRepository {
    private readonly saltLength = 16;

    // Encriptar contraseña
    async hashPassword(password: string): Promise<string> {
        const salt = crypto.randomBytes(this.saltLength).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
        return `${salt}:${hash}`;
    }

    // Verificar contraseña
    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const [salt, hash] = hashedPassword.split(':');
        const hashToCompare = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
        return hash === hashToCompare;
    }
}
