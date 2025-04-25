import express from 'express';
import Order from '../models/Order.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { hasRole } from '../middlewares/roleMiddleware.js';
import mongoose from 'mongoose';

const orderRouter = express.Router();

// Rota que cuida de criação de um pedido
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

// Rota que permite a consulta aos pedidos
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

orderRouter.get(
    '/all',
    authMiddleware,
    hasRole(['admin']),
    async (req, res) => {
        console.log('Iniciando a consulta a todos os pedidos...');
        try {
            const allOrders = await Order.find({});
            console.log(allOrders);
            res.status(200).json(allOrders);
        } catch (error) {
            console.error(error);
        }
    },
);

orderRouter.get(
    '/:id',
    authMiddleware,
    hasRole(['admin']),
    async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido.' });
        }

        try {
            const orders = await Order.find({
                user: new mongoose.Types.ObjectId(id),
            });

            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar pedidos.', error });
        }
    },
);

export default orderRouter;
