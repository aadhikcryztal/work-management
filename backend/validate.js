//VALIDATION
const joi = require("@hapi/joi");

const authenticationvalidation = ( data ) =>{
    const schema = {
        name: joi.string().min(6).required(),
        password: joi.string().min(6).required(),
        email: joi.string().required().email(),
      };

      return joi.validate( data, schema);
}

const loginvalidation = ( data ) =>{
    const schema = {
        password: joi.string().min(6).required(),
        email: joi.string().required().email(),
      };

      return joi.validate( data, schema);
}
module.exports.authenticationvalidation = authenticationvalidation;
module.exports.loginvalidation = loginvalidation;