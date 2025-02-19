import { Module } from '@nestjs/common'
import { UserController } from './rest/user.controller'
import { CommonModule } from 'src/context/common/common.module'
import { AdvertisementModule } from 'src/context/advertisement/advertisement.module'
import { ConfigurationModel } from "src/context/common/infrastructure/models/configuration.model";
import { ConfigModule } from '@nestjs/config';


export default () => ({
    DB_MODELS: [ConfigurationModel],
  });
@Module({
  imports: [CommonModule, AdvertisementModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
