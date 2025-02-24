import { Injectable, NestInterceptor, CallHandler, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseDto } from './../../context/common/application/dto/response'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {

        if (data instanceof HttpException) {
          return {
            code: data.getStatus(),
            message: data.message,
            data: null,
          }
        }

        if (data instanceof ResponseDto) {
          return {
            code: HttpStatus.OK,
            message: data.message,
            data: data.data,
          }
        }
        
        return {
          code: HttpStatus.OK,
          message: 'Successful request',
          data,
        }
      }),
    )
  }
}
