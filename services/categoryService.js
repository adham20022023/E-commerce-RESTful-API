const Category = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const appError = require("../utils/Api-error");
// @Desc Get all Categories
// @Route Get /api/v1/categories
// @Access public
const getCategories = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const categories = await Category.find()
    .select("-__v")
    .skip(skip)
    .limit(limit);

  res.status(200).json({ result: categories.length, page, data: categories });
});

// @Desc Get Single Category
// @Route Get /api/v1/categories/:id
// @Access public
const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id).select("-__v");

  if (!category) {
    // return res.status(404).json({ msg: `No category found with id ${id}` });
    return next(new appError(`No Category Found with id ${id}`, 404));
  }

  res.status(200).json({ data: category });
});

// @Desc Create New Category
// @Route POST /api/v1/categories
// @Access public
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });

  res.status(201).json({ data: category });
});

// @Desc Update Category
// @Route PUT /api/v1/categories/:id
// @Access public
const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!category) {
    // return res.status(404).json({ message: "Category not found" });
    return next(new appError(`No Category found with id ${id}`, 404));
  }

  res.status(200).json({ data: category });
});

// @Desc Delete Category
// @Route DELETE /api/v1/categories/:id
// @Access public
const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    // return res.status(404).json({ Message: "Category Not Found" });
    return next(new appError(`No Category found with id ${id}`, 404));
  }

  res.status(204).send();
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
