import Joi from 'joi';

export const registerValidate = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8)
        .pattern(new RegExp('?=.*[A-Z]'))
        .pattern(new RegExp('?=.*[a-z]'))
        .pattern(new RegExp('?=.*[0-9]'))
        .required().messages({
            'string.min': 'Password must at least 8 characters',
            'string.pattern.base': 'Password must have at least 1 upper case, lower case and number',
            'any.required': 'Password cannot be empty'
        })
    })
    return schema.validate(data);
}