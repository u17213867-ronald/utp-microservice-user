import { LoginDto } from './../../../../app/input/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { Helper } from './../../../common/domain/utils/helper';
import { TokenServiceRepository } from './../../../common/domain/interfaces/token.service.interface';
import { ResponseDto } from './../../../common/application/dto/response';


@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: TokenServiceRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<ResponseDto> {
      let { universityCode, password } = loginDto;

      const user = await this.userRepository.findByUniversityCode(universityCode);
      if (!user) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
      const isMatch = await Helper.verifyPassword(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Credenciales incorrectas');
      }
  
      const token = await this.jwtService.generate(user)
      return new ResponseDto({
        access_token: token,
        user: {
          id: user.id,
          universityCode: user.universityCode,
          role: user.role,
        },
      })
  }
}
