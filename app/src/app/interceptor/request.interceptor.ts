import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()

    this.trim(request.body)
    this.trim(request.query)
    return next.handle()
  }

  private trim(data: any): void {
    if (!data) return

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim()
      }
    })
  }
}
