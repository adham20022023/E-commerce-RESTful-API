/* eslint-disable node/no-unsupported-features/es-syntax */
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const AppError = require("../utils/Api-error");

const ApiFeatures = require("../utils/apiFeature");
// @Desc Get all products
// @Route Get /api/v1/products
// @Access public
const getProducts = asyncHandler(async (req, res) => {
  // Build Query
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate();
  const products = await apiFeatures.query;
  res.status(200).json({ result: products.length, data: products });
});

// @Desc Get Single Product
// @Route Get /api/v1/products/:id
// @Access public
const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id).select("-__v").populate({
    path: "category",
    select: "name -_id",
  });

  if (!product) {
    // return res.status(404).json({ msg: `No Product found with id ${id}` });
    return next(new AppError(`No Product Found with id ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @Desc Create New Product
// @Route POST /api/v1/products
// @Access public
const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title); // required

  const product = await Product.create(req.body);

  res.status(201).json({ data: product });
});

// @Desc Update Product
// @Route PUT /api/v1/products/:id
// @Access Private
const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!product) {
    // return res.status(404).json({ message: "Product not found" });
    return next(new AppError(`No Product found with id ${id}`, 404));
  }

  res.status(200).json({ data: product });
});

// @Desc Delete Product
// @Route DELETE /api/v1/products/:id
// @Access Private
const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    // return res.status(404).json({ Message: "Product Not Found" });
    return next(new AppError(`No Product found with id ${id}`, 404));
  }

  res.status(204).send();
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
