import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import User from '../model/User.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const accessToken = cookies.accessToken;

        if (!accessToken) {
            return res
                .status(401)
                .json({ message: 'Acesso negado. Token não fornecido.' });
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user)
            return res.status(401).json({ message: 'Usuário não encontrado.' });

        req.user = user;
        next();
    } catch (error) {
        console.log('Erro na decodificação do token:', error);
        res.status(401).json({ message: 'Token inválido.' });
    }
};

export const logoutMiddleware = (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || '');
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
