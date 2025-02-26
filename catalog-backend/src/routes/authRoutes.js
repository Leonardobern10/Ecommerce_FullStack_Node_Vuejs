import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

// Método que cuida do acesso à rota '/register' mediante
// o metodo http [POST]
authRouter.post('/register', async (req, res) => {
    // Faz um destructuring obtendo campos no corpo da requisicao
    const { name, email, password } = req.body;
    try {
        // Instancia um objeto User
        const user = new User({ name, email, password });
        // Salva o objeto como um documento na collection User
        await user.save();
        // Retorna o status http CREATED e uma mensagem de confirmação
        res.status(201).json({ message: `Usuário registrado com sucesso!` });
    } catch (error) {
        // Lança um INTERNAL PROCESSOR ERROR e uma mensagem de erro
        res.status(500).json({ message: error.message });
        console.log(error);
    }
});

// Método que cuida do acesso à rota '/login' mediante
// o metodo http [POST]
authRouter.post('/login', async (req, res) => {
    // Faz um destructuring obtendo os dados do corpo da requisição
    const { email, password } = req.body;
    try {
        // Faz a solicitação de um documento com o email obtido
        // e aguarda até o resultado ficar pronto. O resultado
        // é armazenado na constante.
        const user = await User.findOne({ email });

        // Se a constante estiver vazia ou as senhas não forem equivalentes
        if (!user || !(await user.matchPassword(password))) {
            // Lança um status BAD REQUEST e uma mensagem de erro
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Faz a geração de um token com base no id, na chave-secreta
        // e com tempo de expiração
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '60s',
        });

        // Retorna o token em formato json
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Método que cuida do acesso à rota '/logout' mediante
// o metodo http [POST]
authRouter.post('/logout', authMiddleware, (req, res) => {
    // Executa primeiro a função authMiddleware e, caso
    // recebe uma confimação, finaliza o processamento.
    // Se algo der errado, a execução para no middleware.
    res.json({ message: 'Logout bem-sucedido.' });
});

export default authRouter;
