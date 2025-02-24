import { Global, Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { INFRASTRUCTURE } from "./infrastructure";
import { APPLICATION_SERVICES } from "./application";

// user module entry point
@Global()
@Module({
  imports: [CommonModule],
  providers: [...APPLICATION_SERVICES, ...INFRASTRUCTURE],
  exports: [...APPLICATION_SERVICES, ...INFRASTRUCTURE],
})
export class UserModule {}
