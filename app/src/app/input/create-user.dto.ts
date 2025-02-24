import { IsEmail, IsNotEmpty, IsString, IsBoolean, IsIn, Matches, IsEnum, MinLength } from 'class-validator';
import { UserRole } from './../../context/user/domain/enum/user-role.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'El correo debe ser un email válido' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsEnum(UserRole, { message: 'El rol debe ser uno de: postulante, empresa-usuario, empresa-admin' })
  role: UserRole;

  @IsBoolean({ message: 'El status debe ser un valor booleano' })
  status: boolean;

  @IsNotEmpty({ message: 'El código universitario es obligatorio' })
  @Matches(/^U\d+$/, { message: 'El código universitario debe comenzar con "U" seguido de números' })
  universityCode: string;
}
