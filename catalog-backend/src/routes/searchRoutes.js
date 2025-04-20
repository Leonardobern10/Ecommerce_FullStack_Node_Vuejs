import express from 'express';
import Product from '../models/Product.js';
import { TypeClock } from '../models/Type.js';

const searchRouter = express.Router();

// Melhorando a busca com paginação e ordenação
searchRouter.get('/search', async (req, res) => {
    try {
        // Dados recidos por query params na rota
        const {
            name,
            brand,
            type,
            sortBy,
            order = 'asc',
            page = 1,
            limit = 12,
        } = req.query;

        // Criação de um objeto para realizar a consulta
        // com maior precisão
        const filter = {};

        if (name) {
            // Se recebemos name, pesquisamos por Name
            filter.name = { $regex: new RegExp(name, 'i') };
        }
        if (brand) {
            // Se recebemos brand, pesquisamos por Brand
            filter.brand = { $regex: new RegExp(brand, 'i') };
        }
        if (type && Object.values(TypeClock).includes(type.toUpperCase())) {
            filter.type = type.toUpperCase();
        }

        console.log(type);

        // Recebemos a pagina atual e o limite de produtos
        // a serem exibidos, que são seus valores ou 1
        const pageNumber = Math.max(parseInt(page) || 1, 1);
        const limitNumber = Math.max(parseInt(limit) || 10, 1);
        // Calculamos e identificamos quais produtos serão
        // enviados, evitando a repetição de produtos
        const skip = (pageNumber - 1) * limitNumber;

        const sortOptions = {};

        if (sortBy) {
            sortOptions[sortBy] = order === 'desc' ? -1 : 1;
        }

        const products = await Product.find(filter) //name ou brand
            .sort(sortOptions)
            .skip(skip) // de quanto em quanto
            .limit(limitNumber); // quantos

        console.log(products);

        // total de documentos
        const total = await Product.countDocuments(filter);

        res.json({
            data: products,
            currentPage: pageNumber,
            totalPages: Math.ceil(total / limitNumber),
            totalItems: total,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.error(error);
    }
});

export default searchRouter;
