const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/Api-error");
const SubCategory = require("../models/subCategoryModel");

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};
// GET /api/v1/categories/:categoryId/subcategories
// @Desc Get list of SubCategories
// @Route Get /api/v1/subcategories
// @Access public
exports.getSubcategories = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const SubCategories = await SubCategory.find(req.filterObj)
    .select("-__v")
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res
    .status(200)
    .json({ result: SubCategories.length, page, data: SubCategories });
});

// @Desc Get Single SubCategory
// @Route Get /api/v1/categories/:id
// @Access public
exports.getSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Subcategory = await SubCategory.findById(id)
    .select("-__v")
    .populate({ path: "category", select: "name -_id" });

  if (!Subcategory) {
    // return res.status(404).json({ msg: `No category found with id ${id}` });
    return next(
      new AppError(`No SubcategoryCategory Found with id ${id}`, 404)
    );
  }

  res.status(200).json({ data: Subcategory });
});
exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};
// @desc    Create new subCategory
// @route   POST /api/v1/subcategories
// @access  Private/Admin
exports.createSubCategory = asyncHandler(async (req, res) => {
  // Nested Route
  if (!req.body.category) {
    req.body.category = req.params.category;
  }
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({ data: subCategory });
});
// @Desc Update subCategory
// @Route PUT /api/v1/subcategories/:id
// @Access public
exports.updateSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const Subcategory = await SubCategory.findByIdAndUpdate(
    id,
    { name, slug: slugify(name), category },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!Subcategory) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new AppError(`No SubCategory found with id ${id}`, 404));
  }

  res.status(200).json({ data: Subcategory });
});

// @Desc Delete subCategory
// @Route DELETE /api/v1/subcategories/:id
// @Access public
exports.deleteSubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findByIdAndDelete(id);

  if (!subcategory) {
    // return res.status(404).json({ Message: "Category Not Found" });
    return next(new AppError(`No subCategory found with id ${id}`, 404));
  }

  res.status(204).send();
});
