import { Request, Response } from 'express';
import { Customer } from '../models';

export class CustomerController {
    // GET /api/Customers
    static async getAllCustomers(req: Request, res: Response): Promise<void> {
      try {
        const customers = await Customer.findAll({
        });
        res.json(customers);
      } catch (error) {
        console.error('Error getting customers:', error);
        res.status(500).json({ error: 'Failed to retrieve customers' });
      }
    }
    // GET /api/Customers/:id
    static async getCustomersById(req: Request, res: Response): Promise<void> {
        try {
          const id = parseInt(req.params.id);
          const customer = await Customer.findByPk(id);
          
          if (!customer) {
            res.status(404).json({ error: 'Customer not found' });
            return;
          }
    
          res.json(customer);
        } catch (error) {
          console.error('Error getting customer:', error);
          res.status(500).json({ error: 'Failed to retrieve customer' });
        }
      }
      //POST /api/Customers
      static async createCustomer(req: Request, res: Response): Promise<void> {
        try {
          const { name, email } = req.body;
          const customer= await Customer.create({ name, email});
          res.status(201).json(customer);
        } catch (error) {
          console.error('Error creating customer:', error);
          res.status(500).json({ error: 'Failed to create customer' });
        }
      }
      // PUT /api/Customers/:id
      static async updateCustomer(req: Request, res: Response): Promise<void> {
        try {
          const id = parseInt(req.params.id);
          const { name, email } = req.body;
          
          const [updatedRowsCount] = await Customer.update(
            { name, email },
            { where: { id } }
          );
          
          if (updatedRowsCount === 0) {
            res.status(404).json({ error: 'Customer not found' });
            return;
          }
    
          const customer = await Customer.findByPk(id);
          res.json(customer);
        } catch (error) {
          console.error('Error updating customer:', error);
          res.status(500).json({ error: 'Failed to update customer' });
        }
      }
    // DELETE /api/customer/:id
    static async deleteCustomer(req: Request, res: Response): Promise<void> {
      try {
        const id = parseInt(req.params.id);
        const deletedRowsCount = await Customer.destroy({
          where: { id }
        });
        
        if (deletedRowsCount === 0) {
          res.status(404).json({ error: 'Customer not found' });
          return;
        }
  
        res.json({ message: 'Customer deleted successfully' });
      } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Failed to delete customer' });
      }
    }
}