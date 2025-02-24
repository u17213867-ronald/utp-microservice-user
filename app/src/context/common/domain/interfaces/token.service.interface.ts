export abstract class TokenServiceRepository {
    generate: (data: any) => Promise<string>;
    decrypt: (token: string) => Promise<any>;
}