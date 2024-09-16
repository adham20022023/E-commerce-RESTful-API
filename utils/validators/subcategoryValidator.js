const { check, body } = require(`express-validator`);
const validationMiddleware = require(`../../Middlewares/validationMiddleware`);
const slugify = require("slugify");

exports.getSubcategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory Id"),
  validationMiddleware,
];
exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory Required")
    .isLength({ min: 2 })
    .withMessage("Too short subCategory Name")
    .isLength({ max: 32 })
    .withMessage("Too Long subCategory name"),
  check("category")
    .notEmpty()
    .withMessage("SubCategory Must be belong to Category")
    .isMongoId()
    .withMessage("Invalid category Id"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validationMiddleware,
];
exports.updateSubcategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subCategory Id Required")
    .isMongoId()
    .withMessage("Invalid subCategory Id"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validationMiddleware,
];
exports.deleteSubcategoryValidator = [
  check("id")
    .notEmpty()
    .withMessage("subCategory Id Required")
    .isMongoId()
    .withMessage("Invalid subCategory Id"),
  validationMiddleware,
];
