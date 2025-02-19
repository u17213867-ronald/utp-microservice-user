import { Column, DataType, Model, Table } from 'sequelize-typescript'
import * as Sequelize from 'sequelize'

@Table({
  tableName: 'configuration',
})
export class ConfigurationModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  value: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  })
  createdAt: Date

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  })
  updatedAt: Date
}
