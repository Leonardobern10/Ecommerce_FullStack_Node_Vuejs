import express from 'express';
import User from '../models/User.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { hasRole } from '../middlewares/roleMiddleware.js';

const userRouter = express.Router();

userRouter.get('/', authMiddleware, hasRole(['admin']), async (req, res) => {
    try {
        console.log('Chamando...');
        const allUsers = await User.find({});
        console.log('Solicitação aprovada!');
        res.status(200).json({ allUsers });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao consultar os clientes' });
        console.error(error);
    }
});

export default userRouter;
