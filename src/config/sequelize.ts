import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

// Import all models
import { Category } from '../models/Category';
import { Customer } from '../models/Customer';
import { Product } from '../models/Product';
import { Inventory } from '../models/Inventory';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  dialect: 'postgres',
  models: [Category, Customer, Product, Inventory, Order, OrderItem],
  logging: false, // Puedes cambiar esto a false en producción
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;
