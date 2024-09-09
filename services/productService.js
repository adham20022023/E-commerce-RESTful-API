/* eslint-disable node/no-unsupported-features/es-syntax */
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const AppError = require("../utils/Api-error");
// @Desc Get all products
// @Route Get /api/v1/products
// @Access public
const getProducts = asyncHandler(async (req, res) => {
  // console.log(req.query);

  // filtering
  const queryStringobj = { ...req.query };
  const exitFields = ["page", "sort", "limit", "fields", "keyword"];
  exitFields.forEach((field) => delete queryStringobj[field]);
  // Apply filtering using [gte,gt,lte,lt]
  let queryString = JSON.stringify(queryStringobj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );
  queryString = JSON.parse(queryString);

  // Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  // Build Query
  const mongooseQuery = Product.find(queryString)
    .select("-__v")
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  //execute query
  const products = await mongooseQuery;

  res.status(200).json({ result: products.length, page, data: products });
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
