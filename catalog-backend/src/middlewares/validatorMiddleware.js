import { SourceRegisterError } from '../errors/authError.js';
import { validatorSchema } from '../validators/registerValidator.js';

export const registerValidator = async (req, res, next) => {
    try {
        await validatorSchema.validateAsync(req.body);
        next();
    } catch (error) {
        const { path, type } = error.details[0];
        res.status(400).json({ message: SourceRegisterError(path, type) });
    }
};
