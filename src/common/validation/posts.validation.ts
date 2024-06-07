import Joi from "joi";

export const createPostSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    author: Joi.number().required(),
});