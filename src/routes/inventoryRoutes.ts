import { Router } from 'express';
import { InventoryController } from '../controllers/inventoryController';

const router = Router();

// Inventory routes
router.get('/', InventoryController.getAllInventory);
router.get('/:productId', InventoryController.getInventoryByProductId);
router.post('/', InventoryController.createInventory);
router.put('/:productId', InventoryController.updateInventory);
router.delete('/:productId', InventoryController.deleteInventory);

export default router;