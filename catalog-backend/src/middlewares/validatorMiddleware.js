import { SourceRegisterError } from '../errors/authError.js';

export const infoValidator = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        const { path, type } = error.details[0];
        res.status(400).json({ message: SourceRegisterError(path, type) });
    }
};
