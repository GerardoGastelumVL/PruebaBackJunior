import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './Product';
import { Order } from './Order';

@Table({
  tableName: 'order_items',
  timestamps: false
})
export class OrderItem extends Model {
  @PrimaryKey
  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  order_id!: number;

  @PrimaryKey
  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  product_id!: number;

  @Column(DataType.INTEGER)
  qty!: number;

  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @BelongsTo(() => Order)
  order!: Order;

  @BelongsTo(() => Product)
  product!: Product;
}
