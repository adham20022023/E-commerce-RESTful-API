// @desc Finds the validation errors in this request and warps them in an object with handy function
const { validationResult } = require(`express-validator`);
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = validationMiddleware;
