import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res
            .status(401)
            .json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(
            token.replace('Bearer ', ''),
            process.env.JWT_SECRET,
        );
        console.log('Token decodificado:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Erro na decodificação do token:', error);
        res.status(401).json({ message: 'Token inválido.' });
    }
};

export default authMiddleware;
