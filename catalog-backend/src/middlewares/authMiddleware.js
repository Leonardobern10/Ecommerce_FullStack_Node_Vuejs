import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const authMiddleware = (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || '');

    const accessToken = cookies.accessToken;
    console.log('Esse é o token:', accessToken);

    if (!accessToken) {
        return res
            .status(401)
            .json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Erro na decodificação do token:', error);
        res.status(401).json({ message: 'Token inválido.' });
    }
};

export default authMiddleware;
