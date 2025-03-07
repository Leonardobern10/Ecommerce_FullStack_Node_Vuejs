import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração de middlewares
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }),
);
app.use(cookieParser()); // Permite manipulação de cookies
app.use(express.json());

// Definição de rotas
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/healthCheck', (req, res) => {
    res.status(200).json({ message: 'Api funcionando corretamente!' });
});

// Conexão com MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.log(err));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
