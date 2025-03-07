import express from 'express';
import Product from '../model/Product.js';

const productRouter = express.Router();

// Cadastrar produto
productRouter.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
});

// Listar todos os produtos
productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
});

// Atualizar um produto
productRouter.put('/:id', async (req, res) => {
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
