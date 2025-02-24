import { UserInterface } from "../interface/user.interface";

export abstract class UserRepository {
  abstract create(data: Partial<UserInterface>): Promise<UserInterface>;
  abstract findById(id: number): Promise<UserInterface | null>;
  abstract findByEmail(email: string): Promise<UserInterface | null>;
  abstract findAll(): Promise<UserInterface[]>;
  abstract update(id: number, data: Partial<UserInterface>): Promise<UserInterface>;
  abstract delete(id: number): Promise<number>;
  abstract findByUniversityCode(id: string): Promise<UserInterface | null>;

}
