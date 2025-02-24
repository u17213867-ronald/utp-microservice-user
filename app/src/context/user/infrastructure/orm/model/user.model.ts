import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'user',
    comment: 'User table'
  })
  export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      comment: 'Unique identifier',
    })
    id: number;
  
    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      comment: 'User email address',
    })
    email: string;
  
    @Column({
      type: DataType.STRING(255),
      allowNull: false,
      comment: 'User password (hashed)',
    })
    password: string;
  
    @Column({
      type: DataType.ENUM('postulante', 'empresa-usuario', 'empresa-admin'),
      allowNull: false,
      comment: 'User role',
    })
    role: 'postulante' | 'empresa-usuario' | 'empresa-admin';
  
    @Column({
      field: 'activation_token', 
      type: DataType.TEXT,
      allowNull: true,
      comment: 'Activation token',
    })
    activationToken: string;
  
    @Column({
      field: 'expiration_token', 
      type: DataType.DATE,
      allowNull: true,
      comment: 'Activation token expiration date',
    })
    expirationToken: Date;
  
    @CreatedAt
    @Column({
      field: 'created_at',
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
      comment: 'Creation date',
    })
    createdAt: Date;
  
    @UpdatedAt
    @Column({
      field: 'updated_at',
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
      comment: 'Last update date',
    })
    updatedAt: Date;
  
    @Column({
      field: 'university_code',
      type: DataType.STRING,
      allowNull: false,
      defaultValue: '',
      comment: 'Creation date',
    })
    universityCode: string;

    @Column({
      type: DataType.TINYINT,
      allowNull: false,
      defaultValue: 1,
      comment: 'Account status (active/inactive)',
    })
    status: number;
  }
  