import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasMany, CreatedAt } from 'sequelize-typescript';
import { Customer } from './Customer';
import { OrderItem } from './OrderItem';

@Table({
  tableName: 'orders',
  timestamps: false
})
export class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customer_id!: number;

  @Column(DataType.STRING)
  status!: string;

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date;

  @Column(DataType.DATE)
  shipped_at?: Date;

  @Column(DataType.JSONB)
  shipping_address!: Record<string, any>;

  @BelongsTo(() => Customer)
  customer!: Customer;

  @HasMany(() => OrderItem)
  orderItems!: OrderItem[];
}