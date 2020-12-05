const Joi = require('joi')

const greenhouseSchema = Joi.object({
    name: Joi.string().max(255).required(),
    temperature: Joi.number().required()
})

const userValidation = (data) => {
    const { error } = greenhouseSchema.validate(data)
    return !error
}

module.exports = userValidation
