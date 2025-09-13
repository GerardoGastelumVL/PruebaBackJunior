import { Request, Response } from 'express';
import { Product } from '../models';

export class ProductController {
  // GET /api/products
  static async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await Product.findAll({
        order: [['created_at', 'DESC']],
        include: ['category']
      });
      res.json(products);
    } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ error: 'Failed to retrieve products' });
    }
  }

  // GET /api/products/:id
  static async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const product = await Product.findByPk(id, {
        include: ['category', 'inventory']
      });
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ error: 'Failed to retrieve product' });
    }
  }

  // POST /api/products
  static async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const { sku, name, price, category_id, active = true } = req.body;
      const product = await Product.create({ sku, name, price, category_id, active });
      res.status(201).json(product);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
    }
  }

  // PUT /api/products/:id
  static async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { sku, name, price, category_id, active } = req.body;
      const [updatedRowsCount] = await Product.update(
        { sku, name, price, category_id, active },
        { where: { id } }
      );
      
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      const product = await Product.findByPk(id, {
        include: ['category', 'inventory']
      });
      res.json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  }

  // DELETE /api/products/:id
  static async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deletedRowsCount = await Product.destroy({
        where: { id }
      });
      
      if (deletedRowsCount === 0) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }
}