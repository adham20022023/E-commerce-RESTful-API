const Brand = require("../models/brandModel");

const {
  deleteOne,
  UpdateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");
// @Desc Get all Brands
// @Route Get /api/v1/Brands
// @Access public
const getBrands = getAll(Brand);

// @Desc Get Specific Brand by id
// @Route Get /api/v1/Brands/:id
// @Access public
const getBrand = getOne(Brand);

// @Desc Create New Brand
// @Route POST /api/v1/brands
// @Access public
const createBrand = createOne(Brand);
// exports.applySlug = asyncHandler(async (req, res, next) => {
//   req.body.slug = slugify(req.body.name);
//   next();
// });

// @Desc Update Brand
// @Route PUT /api/v1/Brands/:id
// @Access public
const updateBrand = UpdateOne(Brand);

// @Desc Delete Brand
// @Route DELETE /api/v1/Brand/:id
// @Access public
const deleteBrand = deleteOne(Brand);

module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
