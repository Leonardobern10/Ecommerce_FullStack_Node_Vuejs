import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
        expiresIn: '15s',
    });
};

export const generateRefreshToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, process.env.REFRESH_SECRET_KEY, {
        expiresIn: '7d',
    });
};
