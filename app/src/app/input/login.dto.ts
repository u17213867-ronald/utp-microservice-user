import { UserRole } from './../../context/user/domain/enum/user-role.enum';
import { IsNotEmpty, IsString, MinLength, Matches, IsEnum } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'El código universitario es obligatorio' })
  @IsString({ message: 'El código universitario debe ser un texto' })
  @Matches(/^U\d+$/, { message: 'El código universitario debe comenzar con "U" seguido de números' })
  universityCode: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'El rol es obligatorio' })
  @IsEnum(UserRole, { message: 'El rol debe ser uno de: postulante, empresa-usuario, empresa-admin' })
  role: UserRole;
}
