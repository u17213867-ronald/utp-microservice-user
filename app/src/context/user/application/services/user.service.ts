import { Helper } from './../../../common/domain/utils/helper';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { ResponseDto } from './../../../common/application/dto/response';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<ResponseDto> {

    const user = await this.userRepository.findByUniversityCode(createUserDto.universityCode);
    if (user) {
      throw new UnauthorizedException('el universityCode ya existe');
    }

    const userEmail = await this.userRepository.findByEmail(createUserDto.email);
    if (userEmail) {
      throw new UnauthorizedException('el userEmail ya existe');
    }

    createUserDto.password = await Helper.encryptPassword(createUserDto.password)
    const createdUser = await this.userRepository.create(createUserDto);
    return new ResponseDto(createdUser)
  }
}

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: number, createUserDto: CreateUserDto): Promise<ResponseDto> {
    const user = await this.userRepository.findById(id);

    const userUniversityCode = await this.userRepository.findByUniversityCode(createUserDto.universityCode);
    if (userUniversityCode && userUniversityCode.universityCode !== createUserDto.universityCode) {
      throw new UnauthorizedException('el universityCode ya existe');
    }

    const userEmail = await this.userRepository.findByEmail(createUserDto.email);
    if (userEmail && userEmail.email !== createUserDto.email) {
      throw new UnauthorizedException('el userEmail ya existe');
    }
    
    createUserDto.password = await Helper.encryptPassword(createUserDto.password)
    const updateUser = await this.userRepository.update(id, createUserDto);
    return new ResponseDto(updateUser)
  }
}
