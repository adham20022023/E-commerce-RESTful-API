const { check } = require(`express-validator`);
const validationMiddleware = require(`../../Middlewares/validationMiddleware`);
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
  validationMiddleware,
];
exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  validationMiddleware,
];
exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  validationMiddleware,
];
