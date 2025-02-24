import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';

const authRouter = express.Router();

// * Registro de usuário
authRouter.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: `Usuário registrado com sucesso!` });
        alert('Usuário registrado com sucesso!');
    } catch (error) {
        alert('Erro ao registrar usuário.');
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
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default authRouter;
