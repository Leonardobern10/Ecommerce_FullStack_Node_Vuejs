import { JOI_TYPE_ERRORS } from './joiTypeErrors.js';
import { infoQuantityCaracteres } from './errorUtils.js';

export const SourceRegisterError = (path, type) => {
    /*
     * Verificar no array recebido
     */

    return TypeRegisterError(path[0], type);
};

export const TypeRegisterError = (source, type) => {
    switch (type) {
        case JOI_TYPE_ERRORS.EMPTY:
            return `O campo ${source.toUpperCase()} está vazio!`;
        case JOI_TYPE_ERRORS.INVALID_PATTERN:
            if (source === 'password') {
                return `Senha inválida. É necessário que ela contenha letras minúsculas, maiúsculas, caracteres especiais, números e no mínimo 8 caracteres.`;
            }
            if (source === 'email') {
                return 'Formato de email inválido!';
            }
            break;
        case JOI_TYPE_ERRORS.MIN:
            if (source === 'name') {
                return responseQuantityError(
                    'min',
                    source,
                    infoQuantityCaracteres.MIN_CARACTERES_NAME,
                );
            } else if (source === 'password') {
                return responseQuantityError(
                    'min',
                    source,
                    infoQuantityCaracteres.MIN_CARACTERES_PASSWORD,
                );
            }
            break;
        case JOI_TYPE_ERRORS.MAX:
            if (source === 'name') {
                return responseQuantityError(
                    'max',
                    source,
                    infoQuantityCaracteres.MAX_CARACTERES_NAME,
                );
            } else if (source === 'password') {
                return responseQuantityError(
                    'max',
                    source,
                    infoQuantityCaracteres.MAX_CARACTERES_PASSWORD,
                );
            }
            break;
        case JOI_TYPE_ERRORS.ALPHANUM:
            return `O campo ${source.toUpperCase()} aceita apenas letras e números.`;
        default:
            return 'Erro no processamento de informações! Tente novamente!';
    }
};

const responseQuantityError = (filter, source, validState) => {
    if (filter === infoQuantityCaracteres.TYPE.MIN) {
        return `Quantidade de caracteres inferior ao esperado no campo ${source.toUpperCase()}.\nMIN. ${validState} caracteres.`;
    } else if (filter === infoQuantityCaracteres.TYPE.MAX) {
        return `Quantidade de caracteres superior ao esperado no campo ${source.toUpperCase()}.\nMAX. ${validState} caracteres.`;
    } else {
        throw Error('Tipo de filtro não permitido!');
    }
};
