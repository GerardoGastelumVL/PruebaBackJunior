import { Router } from 'express';
import customerRoutes from './customerRoutes';
import categoryRoutes from './categoryRoutes';
import productRoutes from './productRoutes';
import inventoryRoutes from './inventoryRoutes';
import orderRoutes from './orderRoutes';

const router = Router();

// API routes
router.use('/categories', categoryRoutes);
router.use('/customers', customerRoutes);
router.use('/products', productRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/orders', orderRoutes);

export default router;