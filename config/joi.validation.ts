import * as Joi from 'joi';

//crear un validador de variables de entorno
export const JoiValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    MONGODB: Joi.string().required(),
    DEFAULT_LIMIT: Joi.number().default(7),
});
