// user module entry point

import { Sequelize } from "sequelize-typescript"
import { UserRepository } from "../domain/repositories/user.repository"
import { UserMysqlRepository } from "./repositories/user.repository.mysql"


export const USER_REPOSITORY_PROVIDER = {
    inject: ['SEQUELIZE'],
    provide: UserRepository,
    useFactory: async (sequelize: Sequelize) => {
      return new UserMysqlRepository(sequelize)
    },
  }
  
  export const INFRASTRUCTURE = [USER_REPOSITORY_PROVIDER]
  