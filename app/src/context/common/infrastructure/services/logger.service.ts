import { Injectable } from '@nestjs/common'
import { LogTypeEnum } from '../../domain/enum/log-type.enum'

@Injectable()
export class LoggerService {
  log(
    type: string,
    statusCode: number,
    message: string,
    request: any,
    responseTime: number | null = null,
    trace: any = null,
  ): void {
    const data = {
      headers: this.setHeaders(request),
      request: this.setRequest(request),
    }

    const context = {
      url: decodeURIComponent(String(request.originalUrl.toString())),
      method: request.method,
      data,
    }

    const log = {
      type,
      statusCode,
      message,
      context,
      trace,
      responseTime: responseTime ? `${responseTime} ms` : null,
    }

    console.log(JSON.stringify(log))
  }

  info(statusCode: number, message: string, request: any, response: any, responseTime: number | null = null): void {
    request.data = this.formatData(request.data)

    const log = {
      type: LogTypeEnum.INFO,
      statusCode,
      message,
      request,
      response,
      responseTime: responseTime ? `${responseTime} ms` : null,
    }

    console.log(JSON.stringify(log))
  }

  error(message: string, data: any, error: any): void {
    const log = {
      type: LogTypeEnum.CRITICAL,
      statusCode: error.response?.status ?? 500,
      message,
      data: this.formatData(data),
      trace: error.message,
      error: error.response?.data ?? null,
    }

    console.log(JSON.stringify(log))
  }

  private setHeaders(request: any) {
    return {
      'x-forwarded-for': request.headers['x-forwarded-for'] ?? null,
      'user-agent': request.headers['user-agent'] ?? null,
      srv: request.headers.srv ?? null,
    }
  }

  private setRequest(request: any) {
    return {
      params: request.params ?? null,
      query: request.query ?? null,
      body: this.formatData(request.body),
    }
  }

  private formatData(data: any): any {
    if (data == null || typeof data !== 'object') {
      return data
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.formatData(item))
    }

    return Object.keys(data).reduce((acc, key) => {
      if (key === 'password' || key === 'groupId' || key === 'apiKey') {
        acc[key] = '*******'
      } else {
        acc[key] = this.formatData(data[key])
      }
      return acc
    }, {})
  }
}
