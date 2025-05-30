import express from 'express';
import Product from '../models/Product.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { hasRole } from '../middlewares/roleMiddleware.js';
import searchRouter from './searchRoutes.js';

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
        const { order = 'asc', page = 1, limit = 10 } = req.query;

        const pageNumber = Math.max(parseInt(page) || 1, 1);
        const limitNumber = Math.max(parseInt(limit) || 10, 1);
        const skip = (pageNumber - 1) * limitNumber;

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

// Quando a rota .../search é acessada, ele chama o roteador de search
// que é o responsável por coordenar as rotas
productRouter.get('/search', searchRouter);

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

productRouter.patch('/change/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (updateData === undefined) {
            console.log('Estoque invalido');
            return res.status(400).json({ mensagem: 'Estoque inválido' });
        }

        const updateProduct = await Product.findByIdAndUpdate(
            id,
            { $set: updateData }, // Atualiza apenas o campo "stock"
            { new: true, runValidators: true },
        );
        console.log(updateProduct);

        if (!updateProduct) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }

        res.json(updateProduct);
    } catch (erro) {
        console.log('Erro no final');
        res.status(400).json({ erro: erro.message });
        console.log(erro.message);
    }
});

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
