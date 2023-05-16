import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Account } from '../../accounts/models/accounts.entity';

interface UserCreationAttrs {
  email: string;
  password: string;
  telegramId: number;
}

@Table
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  telegramId: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  bonus: number;

  @HasMany(() => Account, 'ownerId')
  accounts: Account[];
}
