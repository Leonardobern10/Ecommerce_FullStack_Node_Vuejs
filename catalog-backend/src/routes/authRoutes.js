import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

// * Registro de usuário
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: `Usuário registrado com sucesso!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '5m',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

authRouter.post('/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Logout bem-sucedido.' });
});

export default authRouter;
