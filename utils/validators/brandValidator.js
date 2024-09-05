const { check } = require(`express-validator`);
const validationMiddleware = require(`../../Middlewares/validationMiddleware`);
exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id"),
  validationMiddleware,
];
exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand Required")
    .isLength({ min: 3 })
    .withMessage("Too short Brand Name")
    .isLength({ max: 32 })
    .withMessage("Too Long Brand name"),
  validationMiddleware,
];
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id"),
  validationMiddleware,
];
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id"),
  validationMiddleware,
];
