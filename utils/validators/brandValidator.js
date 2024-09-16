const { check, body } = require(`express-validator`);
const validationMiddleware = require(`../../Middlewares/validationMiddleware`);
const slugify = require("slugify");

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
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validationMiddleware,
];
exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validationMiddleware,
];
exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id"),
  validationMiddleware,
];
