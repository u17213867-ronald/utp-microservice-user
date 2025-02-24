import { PasswordService } from "../../infrastructure/services/password.service";

export class Helper {
    static async encryptPassword(password: string): Promise<string> {
        const service = new PasswordService()
        return await service.hashPassword(password);
    }

    static async verifyPassword(password: string, hash: string): Promise<boolean> {
        const service = new PasswordService()
        return await service.verifyPassword(password, hash);
    }
}