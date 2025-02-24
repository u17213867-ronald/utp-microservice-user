import { LoggerService } from './../../context/common/infrastructure/services/logger.service';
import { LogTypeEnum } from './../../context/common/domain/enum/log-type.enum';
import { type CallHandler, type ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common'
import { type Observable, tap } from 'rxjs'

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly loggerService = new LoggerService()

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const startTime = Date.now()

    return next.handle().pipe(
      tap(() => {
        if (!String(request.originalUrl).includes('health')) {
          const response = context.switchToHttp().getResponse()

          if (response.statusCode >= 200 && response.statusCode < 300) {
            const endTime = Date.now()
            const responseTime = endTime - startTime

            // /this.loggerService.log(LogTypeEnum.INFO, response.statusCode, 'Successful request', request, responseTime)
          }
        }
      }),
    )
  }
}
