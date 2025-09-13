import { Request, Response } from 'express';
import { Inventory } from '../models';

export class InventoryController {
  // GET /api/inventory
  static async getAllInventory(req: Request, res: Response): Promise<void> {
    try {
      const inventory = await Inventory.findAll({
        include: ['product'],
        order: [['product', 'name', 'ASC']]
      });
      res.json(inventory);
    } catch (error) {
      console.error('Error getting inventory:', error);
      res.status(500).json({ error: 'Failed to retrieve inventory' });
    }
  }

  // GET /api/inventory/:productId
  static async getInventoryByProductId(req: Request, res: Response): Promise<void> {
    try {
      const productId = parseInt(req.params.productId);
      const inventory = await Inventory.findByPk(productId, {
        include: ['product']
      });
      
      if (!inventory) {
        res.status(404).json({ error: 'Inventory record not found' });
        return;
      }

      res.json(inventory);
    } catch (error) {
      console.error('Error getting inventory:', error);
      res.status(500).json({ error: 'Failed to retrieve inventory' });
    }
  }

  // POST /api/inventory
  static async createInventory(req: Request, res: Response): Promise<void> {
    try {
      const { product_id, stock } = req.body;
      const inventory = await Inventory.create({ product_id, stock });
      res.status(201).json(inventory);
    } catch (error) {
      console.error('Error creating inventory:', error);
      res.status(500).json({ error: 'Failed to create inventory record' });
    }
  }

  // PUT /api/inventory/:productId
  static async updateInventory(req: Request, res: Response): Promise<void> {
    try {
      const productId = parseInt(req.params.productId);
      const { stock } = req.body;
      const [updatedRowsCount] = await Inventory.update(
        { stock },
        { where: { product_id: productId } }
      );
      
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Inventory record not found' });
        return;
      }

      const inventory = await Inventory.findByPk(productId, {
        include: ['product']
      });
      res.json(inventory);
    } catch (error) {
      console.error('Error updating inventory:', error);
      res.status(500).json({ error: 'Failed to update inventory' });
    }
  }

  // DELETE /api/inventory/:productId
  static async deleteInventory(req: Request, res: Response): Promise<void> {
    try {
      const productId = parseInt(req.params.productId);
      const deletedRowsCount = await Inventory.destroy({
        where: { product_id: productId }
      });
      
      if (deletedRowsCount === 0) {
        res.status(404).json({ error: 'Inventory record not found' });
        return;
      }

      res.json({ message: 'Inventory record deleted successfully' });
    } catch (error) {
      console.error('Error deleting inventory:', error);
      res.status(500).json({ error: 'Failed to delete inventory record' });
    }
  }
}