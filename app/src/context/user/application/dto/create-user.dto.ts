import { UserRole } from "../../domain/enum/user-role.enum";

export interface CreateUserDto {
    email: string;
    password: string;
    role: UserRole;
    universityCode: string;
  }
  