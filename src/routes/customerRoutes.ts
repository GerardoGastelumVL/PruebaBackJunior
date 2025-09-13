import { Router } from 'express';
import { CustomerController } from '../controllers/customerController';

const router = Router();

// Customer routes
router.get('/', CustomerController.getAllCustomers);
router.get('/:id',CustomerController.getCustomersById);
router.post('/', CustomerController.createCustomer);
router.put('/:id',CustomerController.updateCustomer);
router.delete('/:id',CustomerController.deleteCustomer);

export default router;
