import { Request, Response } from 'express';
import { Order, OrderItem, sequelize } from '../models';

export class OrderController {
  // GET /api/orders
  static async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await Order.findAll({
        order: [['created_at', 'DESC']],
        include: ['customer', 'orderItems']
      });
      res.json(orders);
    } catch (error) {
      console.error('Error getting orders:', error);
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  }

  // GET /api/orders/:id
  static async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const order = await Order.findByPk(id, {
        include: ['customer', 'orderItems']
      });
      
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      res.json(order);
    } catch (error) {
      console.error('Error getting order:', error);
      res.status(500).json({ error: 'Failed to retrieve order' });
    }
  }

  // POST /api/orders
  static async createOrder(req: Request, res: Response): Promise<void> {
    const transaction = await sequelize.transaction();
    
    try {
      const { customer_id, status = 'pending', shipping_address = {}, items } = req.body;
      
      // Create the order
      const order = await Order.create({
        customer_id,
        status,
        shipping_address
      }, { transaction });
      
      // Add order items
      for (const item of items) {
        await OrderItem.create({
          order_id: order.id,
          product_id: item.product_id,
          qty: item.qty,
          price: item.price
        }, { transaction });
      }
      
      await transaction.commit();
      
      // Fetch the complete order with relations
      const completeOrder = await Order.findByPk(order.id, {
        include: ['customer', 'orderItems']
      });
      
      res.status(201).json(completeOrder);
    } catch (error) {
      await transaction.rollback();
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  // PUT /api/orders/:id
  static async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { status, shipped_at, shipping_address } = req.body;
      const [updatedRowsCount] = await Order.update(
        { status, shipped_at, shipping_address },
        { where: { id } }
      );
      
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const order = await Order.findByPk(id, {
        include: ['customer', 'orderItems']
      });
      res.json(order);
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ error: 'Failed to update order' });
    }
  }

  // PUT /api/orders/:id/status
  static async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const [updatedRowsCount] = await Order.update(
        { status },
        { where: { id } }
      );
      
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const order = await Order.findByPk(id, {
        include: ['customer', 'orderItems']
      });
      res.json(order);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  }

  // PUT /api/orders/:id/ship
  static async shipOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const [updatedRowsCount] = await Order.update(
        { 
          status: 'shipped', 
          shipped_at: new Date() 
        },
        { where: { id } }
      );
      
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const order = await Order.findByPk(id, {
        include: ['customer', 'orderItems']
      });
      res.json(order);
    } catch (error) {
      console.error('Error shipping order:', error);
      res.status(500).json({ error: 'Failed to ship order' });
    }
  }

  // PUT /api/orders/:id/cancel
  static async cancelOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const [updatedRowsCount] = await Order.update(
        { status: 'cancelled' },
        { where: { id } }
      );
      
      if (updatedRowsCount === 0) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const order = await Order.findByPk(id, {
        include: ['customer', 'orderItems']
      });
      res.json(order);
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  }

  // DELETE /api/orders/:id
  static async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const deletedRowsCount = await Order.destroy({
        where: { id }
      });
      
      if (deletedRowsCount === 0) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Error deleting order:', error);
      res.status(500).json({ error: 'Failed to delete order' });
    }
  }
}