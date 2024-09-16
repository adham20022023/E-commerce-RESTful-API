const SubCategory = require("../models/subCategoryModel");

const {
  deleteOne,
  UpdateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
// GET /api/v1/categories/:categoryId/subcategories
// @Desc Get list of SubCategories
// @Route Get /api/v1/subcategories
// @Access public
exports.getSubcategories = getAll(SubCategory);

// @Desc Get Single SubCategory
// @Route Get /api/v1/categories/:id
// @Access public
exports.getSubcategory = getOne(SubCategory);

// @desc    Create new subCategory
// @route   POST /api/v1/subcategories
// @access  Private/Admin
exports.createSubCategory = createOne(SubCategory);

// @Desc Update subCategory
// @Route PUT /api/v1/subcategories/:id
// @Access public
exports.updateSubcategory = UpdateOne(SubCategory);

// @Desc Delete subCategory
// @Route DELETE /api/v1/subcategories/:id
// @Access public
exports.deleteSubcategory = deleteOne(SubCategory);
