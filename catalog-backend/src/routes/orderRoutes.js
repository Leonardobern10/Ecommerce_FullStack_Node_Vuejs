import express from 'express';
import Order from '../model/Order.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const orderRouter = express.Router();

orderRouter.post('/', authMiddleware, async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'O carrinho está vazio.' });
        }

        const newOrder = new Order({ user: req.user.id, items, totalAmount });

        await newOrder.save();
        res.status(201).json({
            message: 'Pedido realizado com sucesso!',
            order: newOrder,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar o pedido.', error });
    }
});

orderRouter.get('/', authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate(
            'items.product',
        );
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar pedidos.', error });
    }
});

export default orderRouter;
