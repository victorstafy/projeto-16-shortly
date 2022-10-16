import joi from 'joi';

const siginSchema = joi.object({
  value: joi.number().required(),
  description: joi.string().required(),
  type: joi.string().required(),
});

const sigupSchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required(),
    type: joi.string().required(),
  });

export { siginSchema, sigupSchema };