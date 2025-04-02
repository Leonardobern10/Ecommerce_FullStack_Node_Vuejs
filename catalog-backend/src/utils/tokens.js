import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: '15m',
    });
};

export const generateRefreshToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.REFRESH_SECRET_KEY, {
        expiresIn: '7d',
    });
};

export const generateResetToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30m',
    });
};
