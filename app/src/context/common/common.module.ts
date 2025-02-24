import { Global, Module } from '@nestjs/common'
import { INFRASTRUCTURE } from './infrastructure/index'
import { ConfigService } from './infrastructure/services/config.service'
import { LoggerService } from './infrastructure/services/logger.service'
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt'


@Global()
@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'utp',
      signOptions: { expiresIn: '24h' },
  }),
  ],
  providers: [LoggerService, ConfigService,  ...INFRASTRUCTURE],
  exports: [LoggerService, ConfigService, ...INFRASTRUCTURE],
})
export class CommonModule {}
