import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie
            ? cookie.parse(req.headers.cookie)
            : {};
        const accessToken = cookies.accessToken;

        if (!accessToken) {
            return res
                .status(401)
                .json({ message: 'Acesso negado. Token não fornecido.' });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (!user)
                return res
                    .status(401)
                    .json({ message: 'Usuário não encontrado.' });

            req.user = {
                id: user._id,
                role: user.role,
                email: user.email,
                name: user.name,
            };

            next();
        } catch (error) {
            // Se o erro for de token expirado, verificar se há um refreshToken válido
            if (
                error instanceof jwt.TokenExpiredError &&
                cookies.refreshToken
            ) {
                // Você pode implementar uma lógica de renovação automática ou
                // simplesmente retornar um status especial para o cliente tentar renovar
                return res
                    .status(401)
                    .json({ message: 'Token expirado.', expired: true });
            }

            console.log('Erro na decodificação do token:', error);
            res.status(401).json({ message: 'Token inválido.' });
        }
    } catch (error) {
        console.log('Erro no middleware de autenticação:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
};
export const logoutMiddleware = (req, res, next) => {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
        return res
            .status(401)
            .json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_SECRET_KEY,
        );
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Erro na decodificação do token:', error);
        res.status(401).json({ message: 'Token inválido.' });
    }
};
