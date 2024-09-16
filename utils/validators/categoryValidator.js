const { check, body } = require(`express-validator`);
const validationMiddleware = require(`../../Middlewares/validationMiddleware`);
const slugify = require("slugify");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  validationMiddleware,
];
exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category Required")
    .isLength({ min: 3 })
    .withMessage("Too short category Name")
    .isLength({ max: 32 })
    .withMessage("Too Long category name"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validationMiddleware,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validationMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  validationMiddleware,
];
