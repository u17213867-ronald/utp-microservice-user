import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository, Sequelize } from 'sequelize-typescript';
import { UserModel } from '../orm/model/user.model';
import { UserInterface } from '../../domain/interface/user.interface';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CustomException } from './../../../common/infrastructure/exceptions/custom.exception';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserMysqlRepository implements UserRepository{
  private repository: Repository<UserModel>;

  constructor(private readonly sequelize: Sequelize) {
    this.sequelize.addModels([UserModel]);
    this.repository = this.sequelize.getRepository(UserModel);
  }

  async create(data: UserInterface): Promise<UserInterface> {
    const transaction = await this.sequelize.transaction()

    try {
       return await this.repository.create(data);
    } catch (error) {
      await transaction.rollback();
      console.log(error)
      throw new CustomException(`Error en algun campo de positions o studies`, HttpStatus.BAD_REQUEST);
    }
  }
  async findById(id: number): Promise<UserInterface | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<UserInterface | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findAll(): Promise<UserInterface[]> {
    return await this.repository.findAll();
  }

  async update(id: number, data: Partial<UserInterface>): Promise<UserInterface> {
    await this.repository.update(data, { where: { id } });
    const response = this.findById(id)
    return response as unknown as UserInterface
  }

  async delete(id: number): Promise<number> {
    return await this.repository.destroy({ where: { id } });
  }

  async findByUniversityCode(universityCode: string): Promise<UserModel | null> {
    return await this.repository.findOne({ where: { universityCode } });
  }  
}
