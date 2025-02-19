import { Injectable } from '@nestjs/common'
import { type Repository, Sequelize } from 'sequelize-typescript'
import { IConfigurationRepository } from '../../domain/interfaces/configuration.interface'
import { RedisService } from '../services/redis.service'
import { ConfigService } from '../services/config.service'
import { ConfigurationModel } from '../models'

@Injectable()
export class ConfigurationRepository implements IConfigurationRepository {
  private readonly repository: Repository<ConfigurationModel>

  constructor(
    sequelize: Sequelize,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    sequelize.addModels([ConfigurationModel])
    this.repository = sequelize.getRepository(ConfigurationModel)
  }

  async findByName(name: string): Promise<string | null> {
    const key = `configuration:${name}`
    const data = await this.redisService.get(key)

    if (data !== null) {
      return data
    }

    const configuration = await this.repository.findOne({
      attributes: ['value'],
      where: { name, isActive: true },
      order: [['createdAt', 'DESC']],
    })

    const value = configuration?.value ?? null

    await this.redisService.set(key, parseInt(this.configService.get('REDIS_CONFIGURATION_TTL')), value)

    return value
  }
}
