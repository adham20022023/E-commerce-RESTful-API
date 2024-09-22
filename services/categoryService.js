const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const Category = require("../models/categoryModel");
const AppError = require("../utils/Api-error");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../Middlewares/uploadImage");
const {
  deleteOne,
  UpdateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");
const uploadCategoryImage = uploadSingleImage("image");
// Memory Storage engine

const resizeImage = asyncHandler(async (req, res, next) => {
  // console.log(req.file);
  if (!req.file) return next();
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/categories/${filename}`);

  req.body.image = filename;
  next();
});

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
  resizeImage,
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
};
