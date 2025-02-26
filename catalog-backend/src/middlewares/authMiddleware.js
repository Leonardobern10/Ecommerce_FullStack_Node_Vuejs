import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Obtem a string localizada no cabeçalho da requisição
    // no campo autorization
    const token = req.header('Authorization');

    // Se o token estiver vazio
    if (!token) {
        // retorna um erro BAD REQUEST e uma mensagem de erro
        return res
            .status(401)
            .json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Verifica a validade do token
        const decoded = jwt.verify(
            // Remove o prefixo Bearer
            token.replace('Bearer ', ''),
            // Passa a chave secreta para validação
            process.env.JWT_SECRET,
        );
        // Após a validação o token é armazenado no usuario
        req.user = decoded;
        // Prosseguimento da execução
        next();
    } catch (error) {
        console.log('Erro na decodificação do token:', error);
        res.status(401).json({ message: 'Token inválido.' });
    }
};

export default authMiddleware;
