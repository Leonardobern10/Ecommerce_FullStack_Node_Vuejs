import express from 'express';
import Product from '../model/Product.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { hasRole } from '../middlewares/roleMiddleware.js';

const productRouter = express.Router();

// Cadastrar produto
productRouter.post(
    '/',
    authMiddleware,
    hasRole(['admin']),
    async (req, res) => {
        try {
            const product = new Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.error(error);
        }
    },
);

// Listar todos os produtos
productRouter.get('/', async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments();

        res.json({
            data: products,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
});

// Listar um produto
productRouter.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});

// Atualizar um produto
productRouter.put(
    '/:id',
    authMiddleware,
    hasRole(['admin', 'editor']),
    async (req, res) => {
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true },
            );
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.error(error);
        }
    },
);

// Deletar produto
productRouter.delete('/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Produto removido com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
});

export default productRouter;
