import { LogTypeEnum } from './../../context/common/domain/enum/log-type.enum';
import { LoggerService } from './../../context/common/infrastructure/services/logger.service';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly loggerService = new LoggerService()

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const type = code >= 400 && code < 500 ? LogTypeEnum.WARNING : LogTypeEnum.CRITICAL
    const trace = exception.showTrace ? exception.stack : null

    this.loggerService.log(type, code, exception.message, request, null, trace)

    response.status(code).json({
      code,
      message: exception.message ?? 'An unexpected error occurred. Please try again later.',
      data: exception.data ?? null,
    })
  }
}
