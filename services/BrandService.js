const Brand = require("../models/brandModel");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const { uploadSingleImage } = require("../Middlewares/uploadImage");
const {
  deleteOne,
  UpdateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlersFactory");
const uploadBrandImage = uploadSingleImage("image");
const resizeImage = asyncHandler(async (req, res, next) => {
  // console.log(req.file);
  if (!req.file) return next();
  const filename = `Brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);

  req.body.image = filename;
  next();
});

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
  resizeImage,
  uploadBrandImage,
  getBrand,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
};
