import { Sequelize } from 'sequelize-typescript'
import { createClient } from 'redis'
import { ConfigService } from './services/config.service'
import { RedisService } from './services/redis.service'
import { ConfigurationModel } from './models/configuration.model'
import { IConfigurationRepository } from '../domain/interfaces/configuration.interface'
import { ConfigurationRepository } from './repositories/configuration.repository'
export const MODELS = [
  ConfigurationModel  
]
export const DATABASE_PROVIDER = {
  provide: 'SEQUELIZE',
  useFactory: async (config: ConfigService) => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: config.get('DB_HOST'),
      port: Number(config.get('DB_PORT')),
      username: config.get('DB_READ_USERNAME'),
      password: config.get('DB_READ_PASSWORD'),
      database: config.get('DB_NAME'),
      logging:
        config.get('DB_LOGGING') === '1'
          ? (query) => {
              console.log(query)
            }
          : false,
      timezone: config.get('APP_TIMEZONE'),
      define: {
        timestamps: false,
      },
    })

    sequelize.addModels(MODELS)
    await sequelize.sync()

    return sequelize
  },
  inject: [ConfigService],
}

export const REDIS_PROVIDER = {
  inject: [ConfigService],
  provide: 'REDIS',
  useFactory: async (config: ConfigService) => {
    const client = createClient({
      socket: {
        tls: false,
        host: config.get('REDIS_HOST'),
        port: Number(config.get('REDIS_PORT')),
      },
    })

    await client.connect()

    return new RedisService(client, config)
  },
}
export const CONFIGURATION_REPOSITORY_PROVIDER = {
  inject: ['SEQUELIZE', 'REDIS', ConfigService],
  provide: IConfigurationRepository,
  useFactory: async (sequelize: Sequelize, redisService: RedisService, configService: ConfigService) => {
    return new ConfigurationRepository(sequelize, redisService, configService)
  },
}



export const INFRASTRUCTURE = [DATABASE_PROVIDER, REDIS_PROVIDER, CONFIGURATION_REPOSITORY_PROVIDER]
