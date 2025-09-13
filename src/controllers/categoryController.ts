import { Request, Response } from 'express';
import { Category } from '../models';

export class CategoryController {
  // GET /api/categories
  static async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']]
      });
      res.json(categories);
    } catch (error) {
      console.error('Error getting categories:', error);
      res.status(500).json({ error: 'Failed to retrieve categories' });
    }
  }

  // GET /api/categories/:id
  static async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const category = await Category.findByPk(id);
      
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.json(category);
    } catch (error) {
      console.error('Error getting category:', error);
      res.status(500).json({ error: 'Failed to retrieve category' });
    }
  }

  // POST /api/categories
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      res.status(201).json(category);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Failed to create category' });
    }
  }

  // PUT /api/categories/:id
  static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { name } = req.body;
      
      const [updatedRowsCount] = await Category.update(
        { name },
        { where: { id } }
      );
      
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      const category = await Category.findByPk(id);
      res.json(category);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Failed to update category' });
    }
  }

  // DELETE /api/categories/:id
  static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deletedRowsCount = await Category.destroy({
        where: { id }
      });
      
      if (deletedRowsCount === 0) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
}