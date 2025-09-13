import 'reflect-metadata';
import sequelize from '../config/sequelize';

// Import all models
import { Category } from './Category';
import { Customer } from './Customer';
import { Product } from './Product';
import { Inventory } from './Inventory';
import { Order } from './Order';
import { OrderItem } from './OrderItem';

// Export models and sequelize instance
export {
  Category,
  Customer,
  Product,
  Inventory,
  Order,
  OrderItem,
  sequelize
};
