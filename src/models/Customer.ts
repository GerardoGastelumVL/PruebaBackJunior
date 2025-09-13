import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany, CreatedAt } from 'sequelize-typescript';
import { Order } from './Order';

@Table({
  tableName: 'customers',
  timestamps: false
})
export class Customer extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  city!: string;

  @HasMany(() => Order)
  orders!: Order[];
}