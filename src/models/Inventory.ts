import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from './Product';

@Table({
  tableName: 'inventory',
  timestamps: false
})
export class Inventory extends Model {
  @PrimaryKey
  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  product_id!: number;

  @Column(DataType.INTEGER)
  stock!: number;

  @BelongsTo(() => Product)
  product!: Product;
}