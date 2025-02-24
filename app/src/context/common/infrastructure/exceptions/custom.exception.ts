import { HttpException } from '@nestjs/common'

export class CustomException extends HttpException {
  public showTrace = false
  public data = null

  constructor(message: string, code: number, trace: any = null, data: any = null) {
    super(message, code)

    if (trace !== undefined) {
      this.showTrace = true
      this.data = data
      this.stack = trace
    }
  }
}
