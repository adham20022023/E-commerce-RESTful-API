const Category = require("../models/categoryModel");
const {
  deleteOne,
  UpdateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

// @Desc Get all Categories
// @Route Get /api/v1/categories
// @Access public
const getCategories = getAll(Category);

// @Desc Get Single Category
// @Route Get /api/v1/categories/:id
// @Access public
const getCategory = getOne(Category);

// @Desc Create New Category
// @Route POST /api/v1/categories
// @Access public
const createCategory = createOne(Category);

// @Desc Update Category
// @Route PUT /api/v1/categories/:id
// @Access public
const updateCategory = UpdateOne(Category);

// @Desc Delete Category
// @Route DELETE /api/v1/categories/:id
// @Access public
const deleteCategory = deleteOne(Category);

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
