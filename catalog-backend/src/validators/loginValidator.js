import Joi from 'joi';

export const loginValidatorSchema = Joi.object({
    email: Joi.string()
        .required()
        .pattern(
            new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'),
        ),

    /* Senhas devem ter no minimo 8 caracteres */
    password: Joi.string()
        .required()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,30}$')),
});
