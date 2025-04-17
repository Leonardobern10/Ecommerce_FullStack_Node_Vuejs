import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';

dotenv.config(); // Carregar variáveis de ambiente
connectDB(); // Conexão com o MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// Configuração de middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser()); // Permite manipulação de cookies
app.use(express.json());

// Definição de rotas
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/allUsers', userRouter);

// Rota para checkar o estado do servidor
app.get('/healthCheck', (req, res) => {
    res.status(200).json({ message: 'Api funcionando corretamente!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
