import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, HasOne, CreatedAt } from 'sequelize-typescript';
import { Category } from './Category';
import { Inventory } from './Inventory';

@Table({
  tableName: 'products',
  timestamps: false
})
export class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  sku!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  category_id!: number;

  @Column(DataType.BOOLEAN)
  active!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  created_at!: Date;

  @BelongsTo(() => Category)
  category!: Category;

  @HasOne(() => Inventory)
  inventory!: Inventory;
}