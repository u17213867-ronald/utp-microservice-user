import { Global, Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { INFRASTRUCTURE } from "./infrastructure";

// advertisement module entry point
@Global()
@Module({
  imports: [CommonModule],
  providers: [...INFRASTRUCTURE],
  exports: [...INFRASTRUCTURE],
})
export class AdvertisementModule {}
