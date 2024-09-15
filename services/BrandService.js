const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const AppError = require("../utils/Api-error");
// @Desc Get all Brands
// @Route Get /api/v1/Brands
// @Access public
const getBrands = asyncHandler(async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  const Brands = await Brand.find().select("-__v").skip(skip).limit(limit);

  res.status(200).json({ result: Brands.length, page, data: Brands });
});

// @Desc Get Specific Brand by id
// @Route Get /api/v1/Brands/:id
// @Access public
const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id).select("-__v");

  if (!Brand) {
    // return res.status(404).json({ msg: `No Brand found with id ${id}` });
    return next(new AppError(`No Brand Found with id ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @Desc Create New Brand
// @Route POST /api/v1/brands
// @Access public
const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.create({ name, slug: slugify(name) });

  res.status(201).json({ data: brand });
});

// @Desc Update Brand
// @Route PUT /api/v1/Brands/:id
// @Access public
const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    id,
    { name, slug: slugify(name) },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!brand) {
    // return res.status(404).json({ message: "Brand not found" });
    return next(new AppError(`No Brand found with id ${id}`, 404));
  }

  res.status(200).json({ data: brand });
});

// @Desc Delete Brand
// @Route DELETE /api/v1/Brand/:id
// @Access public
const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    // return res.status(404).json({ Message: "Brand Not Found" });
    return next(new AppError(`No Brand found with id ${id}`, 404));
  }

  res.status(204).send();
});

module.exports = {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
};
