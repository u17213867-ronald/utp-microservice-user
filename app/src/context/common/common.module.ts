import { Global, Module } from '@nestjs/common'
import { INFRASTRUCTURE } from './infrastructure/index'
import { ConfigService } from './infrastructure/services/config.service'
import { LoggerService } from './infrastructure/services/logger.service'
import { HttpModule } from '@nestjs/axios'


@Global()
@Module({
  imports: [HttpModule],
  providers: [LoggerService, ConfigService,  ...INFRASTRUCTURE],
  exports: [LoggerService, ConfigService, ...INFRASTRUCTURE],
})
export class CommonModule {}
