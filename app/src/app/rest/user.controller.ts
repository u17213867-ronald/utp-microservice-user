import { AuthService } from './../../context/user/application/services/auth.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../input/create-user.dto';
import { UpdateUserService, UserService } from './../../context/user/application/services/user.service';
import { LoginDto } from '../input/login.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly updateUserService: UpdateUserService,
    private readonly authService: AuthService

  ) {}

  @Get('health')
  @HttpCode(200)
  health(): any {
    return {
      code: 200,
      message: 'health',
      data: [],
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto, description: 'Data required to create a user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: CreateUserDto 
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.userService.execute(createUserDto);
  }

  @Put(':userId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'update a new user' })
  @ApiBody({ type: CreateUserDto, description: 'Data required to create a user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: CreateUserDto 
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async updateUser(@Param('userId') id: number, @Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.updateUserService.execute(id, createUserDto);
  }
  
  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'login a user' })
  @ApiBody({ type: LoginDto, description: 'Data required to create a user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: LoginDto 
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body)
  }
}
