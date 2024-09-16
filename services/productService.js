/* eslint-disable node/no-unsupported-features/es-syntax */
const Product = require("../models/productModel");

const {
  deleteOne,
  UpdateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");

// @Desc Get all products
// @Route Get /api/v1/products
// @Access public
const getProducts = getAll(Product, "products");

// @Desc Get Single Product
// @Route Get /api/v1/products/:id
// @Access public
const getProduct = getOne(Product);

// @Desc Create New Product
// @Route POST /api/v1/products
// @Access public
const createProduct = createOne(Product);

// @Desc Update Product
// @Route PUT /api/v1/products/:id
// @Access Private
const updateProduct = UpdateOne(Product);

// @Desc Delete Product
// @Route DELETE /api/v1/products/:id
// @Access Private
const deleteProduct = deleteOne(Product);

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
