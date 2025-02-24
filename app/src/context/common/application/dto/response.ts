export class ResponseDto<T = any> {
    code: number;
    message: string;
    data: T;
  
    constructor(data: T = null, code: number = 200, message: string = 'Successful request') {
      this.code = code;
      this.message = message;
      this.data = data;
    }
  }
  