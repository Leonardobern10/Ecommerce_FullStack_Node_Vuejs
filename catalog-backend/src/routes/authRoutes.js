import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const authRouter = express.Router();

// Gera um accessToken de curta duração
const generateAccessToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
};

// Gera um refreshToken de longa duração
const generateRefreshToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_SECRET_KEY, {
        expiresIn: '7d',
    });
};

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

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshTokens.push(refreshToken);
        await user.save();

        res.cookie('token', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000,
        });

        // Retorna o token em formato json
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * Renovação do Access Token
 *
 */
authRouter.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken)
        return res
            .status(403)
            .json({ message: 'Nenhum refresh token fornecido' });

    try {
        // Verifica se o Refresh Token está salvo no banco
        const user = await User.findOne({ refreshTokens: refreshToken });
        if (!user)
            return res.status(403).json({ message: 'Refresh Token inválido.' });

        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY,
        );
        if (decoded.id !== user._id.toString()) {
            return res.status(403).json({ message: 'Refresh Token inválido' });
        }

        const newAccessToken = generateAccessToken(user._id);

        res.cookie('token', newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 15 * 60 * 1000,
        });

        res.json({ message: 'Token renovado com sucesso!' });
    } catch (error) {
        res.status(403).json({
            message: 'Refresh token inválido ou expirado.',
        });
    }
});

// Método que cuida do acesso à rota '/logout' mediante
// o metodo http [POST]
authRouter.post('/logout', authMiddleware, async (req, res) => {
    const { refreshToken } = req.body;

    try {
        await User.updateOne(
            { _id: req.user.id },
            { $pull: { refreshTokens: refreshToken } },
        );

        res.clearCookie('token');
        res.json({ message: 'Logout bem-sucedido.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar logour' });
    }
});

export default authRouter;
