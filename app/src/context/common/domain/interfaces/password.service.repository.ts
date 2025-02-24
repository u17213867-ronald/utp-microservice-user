export abstract class PasswordServiceRepository {
    hashPassword: (password: string) => Promise<string | null>
    verifyPassword: (password: string, hashedPassword: string) => Promise<boolean>
}
