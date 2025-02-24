import { strict } from "assert";

export interface UserInterface {
    id: number;
    email: string;
    password: string;
    role: 'postulante' | 'empresa-usuario' | 'empresa-admin';
    activationToken?: string | null;
    expirationToken?: Date | null;
    createdAt: Date;
    universityCode: string
    updatedAt: Date;
    status: number;
  }
  