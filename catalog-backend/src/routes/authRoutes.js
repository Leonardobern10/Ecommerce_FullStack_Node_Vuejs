import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import cookie from 'cookie';
import {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken,
} from '../utils/tokens.js';
import nodemailer from 'nodemailer';
import { infoValidator } from '../middlewares/validatorMiddleware.js';
import { loginValidatorSchema } from '../validators/loginValidator.js';
import { registerValidatorSchema } from '../validators/registerValidator.js';

const authRouter = express.Router();

// Gera um refreshToken de longa duração

// Método que cuida do acesso à rota '/register' mediante
// o metodo http [POST]
authRouter.post(
    '/register',
    infoValidator(registerValidatorSchema),
    async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const user = new User({ name, email, password });
            await user.save();
            res.status(201).json({
                message: `Usuário registrado com sucesso!`,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error);
        }
    },
);

// Método que cuida do acesso à rota '/login' mediante
// o metodo http [POST]
authRouter.post(
    '/login',
    infoValidator(loginValidatorSchema),
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email }).select('+password');
            if (!user || !(await user.matchPassword(password))) {
                return res
                    .status(401)
                    .json({ message: 'Credenciais inválidas' });
            }

            const accessToken = generateAccessToken(user._id, user.role);
            const refreshToken = generateRefreshToken(user._id, user.role);

            // Inicializar o array se não existir e adicionar o novo token
            if (!user.refreshTokens) {
                user.refreshTokens = [];
            }
            user.refreshTokens.push(refreshToken);
            await user.save();

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000,
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.json({ accessToken });
        } catch (error) {
            console.error('Erro no login:', error);
            res.status(500).json({ message: 'Erro interno no servidor' });
        }
    },
);

// Renovação do Access Token
authRouter.post('/refresh', async (req, res) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const refreshToken = cookies.refreshToken;

    if (!refreshToken)
        return res
            .status(403)
            .json({ message: 'Nenhum refresh token fornecido' });

    try {
        // Verifica se o Refresh Token está salvo no banco
        const user = await User.findOne({ refreshTokens: refreshToken });
        if (!user)
            return res.status(403).json({ message: 'Refresh Token inválido.' });

        // Verifica a validade do token
        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.REFRESH_SECRET_KEY,
            );

            if (decoded.id !== user._id.toString()) {
                return res
                    .status(403)
                    .json({ message: 'Refresh Token inválido' });
            }

            // Gera um novo accessToken incluindo o role do usuário
            const newAccessToken = generateAccessToken(user._id, user.role);

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 15 * 60 * 1000, // 15 minutos
            });

            res.json({
                message: 'Token renovado com sucesso!',
                accessToken: newAccessToken, // Envie o token na resposta também
            });
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                // Remove o refreshToken expirado da lista do usuário
                user.refreshTokens = user.refreshTokens.filter(
                    (token) => token !== refreshToken,
                );
                await user.save();

                // Limpa os cookies
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');

                return res
                    .status(403)
                    .json({
                        message:
                            'Refresh Token expirado. Faça login novamente.',
                    });
            }
            throw error; // Outros erros serão tratados no catch abaixo
        }
    } catch (error) {
        console.error('Erro na renovação do token:', error);
        res.status(403).json({
            message: 'Refresh token inválido ou expirado.',
        });
    }
});

// Logout do usuário
authRouter.post('/logout', async (req, res) => {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const refreshToken = cookies.refreshToken;

        if (!refreshToken) {
            return res
                .status(400)
                .json({ message: 'Nenhum refresh token encontrado!' });
        }

        // console.log('Token recebido para logout:', refreshToken);

        // Buscar todos os usuários para diagnóstico
        const allUsers = await User.find({}).select('_id email refreshTokens');
        // console.log('Todos os usuários e seus tokens:');

        let foundUser = null;
        allUsers.forEach((user) => {
            // console.log(`Usuário ID: ${user._id}, Email: ${user.email}`);
            // console.log('  RefreshTokens:', user.refreshTokens);

            // Verificar se algum usuário tem o token
            if (
                user.refreshTokens &&
                user.refreshTokens.includes(refreshToken)
            ) {
                console.log('  --> Token encontrado neste usuário!');
                foundUser = user;
            }
        });

        if (!foundUser) {
            console.log('Token não encontrado em nenhum usuário');

            // Como não encontramos o token, vamos apenas limpar os cookies do cliente
            res.clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                path: '/',
            });

            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                path: '/',
            });

            // Mesmo que não tenhamos encontrado o token, vamos considerar o logout bem-sucedido
            // já que o objetivo principal é remover os cookies do cliente
            return res.json({ message: 'Cookies de autenticação removidos.' });
        }

        // Se encontrou o usuário, remove o token do array
        foundUser.refreshTokens = foundUser.refreshTokens.filter(
            (token) => token !== refreshToken,
        );
        await foundUser.save();

        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            path: '/',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Lax',
            path: '/',
        });

        res.json({ message: 'Logout bem-sucedido.' });
    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({ message: 'Erro ao realizar logout' });
    }
});

// Status da conexão do usuário com o sistema
authRouter.get('/userStatus', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Usuario autenticado' });
});

// Recuperação de alguns dados do usuário
authRouter.get('/me', authMiddleware, (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    return res.status(200).json({ id: req.user.id, role: req.user.role });
});

// Envio do link para alteração de senha
authRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const resetToken = generateResetToken(user._id);
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Configuração do transporte de e-mail
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Pode ser outro provedor
            auth: {
                user: process.env.EMAIL_USER, // Email de envio
                pass: process.env.EMAIL_PASS, // Senha do email
            },
        });

        console.log('Usuário:', process.env.EMAIL_USER); // Teste para ver se a variável está carregando
        console.log(
            'Senha:',
            process.env.EMAIL_PASS ? 'Carregada' : 'Não carregada',
        ); // Evita exibir a senha

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Recuperação de Senha',
            text: `Clique no link para redefinir sua senha: ${resetLink}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'E-mail de recuperação enviado!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao processar a solicitação' });
    }
});

// Definição da nova senha
authRouter.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password: newPassword } = req.body; // Corrigido

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user)
            return res.status(404).json({ message: 'Usuário não encontrado!' });

        if (!newPassword || newPassword.length < 6) {
            return res
                .status(400)
                .json({ message: 'Senha deve ter pelo menos 6 caracteres.' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Senha alterada com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao redefinir a senha' });
    }
});

export default authRouter;
