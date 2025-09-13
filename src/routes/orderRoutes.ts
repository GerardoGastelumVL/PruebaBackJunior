import { Router } from 'express';
import { OrderController } from '../controllers/orderController';

const router = Router();

// Order routes
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/', OrderController.createOrder);
router.put('/:id', OrderController.updateOrder);
router.put('/:id/status', OrderController.updateOrderStatus);
router.put('/:id/ship', OrderController.shipOrder);
router.put('/:id/cancel', OrderController.cancelOrder);
router.delete('/:id', OrderController.deleteOrder);

export default router;
