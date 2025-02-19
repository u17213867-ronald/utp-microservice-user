import { type ConfigService } from './config.service'

export class RedisService {
  private readonly prefix: string

  constructor(
    private readonly client: any,
    private readonly configService: ConfigService,
  ) {
    this.prefix = this.configService.get('REDIS_KEY_PREFIX')
  }

  public async set(key: string, ttl: number, value: any): Promise<void> {
    await this.client.setEx(this.formatKey(key), ttl, value ?? '')
  }

  public async delete(key: string): Promise<void> {
    this.client.del(this.formatKey(key))
  }

  public async get(key: string): Promise<string> {
    return this.client.get(this.formatKey(key))
  }

  private formatKey(key: string): string {
    return `${this.prefix}:${key}`
  }
}
