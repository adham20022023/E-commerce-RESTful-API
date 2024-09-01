const Category = require("../models/categoryModel");

//@Desc Get  all Categories
//@Route Get /api/v1/categories
//@access public
async function getCategories(req, res) {
  //   console.log(req.query);
  //! apply Pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  const categories = await Category.find()
    .select("-__v")
    .skip(skip)
    .limit(limit);
  res.status(200).json({ result: categories.length, page, data: categories });
}
//@ Des get Single Category
//@ Route Get /api/v1/categories/:id
//@access public
async function getCategory(req, res) {
  const { id } = req.params;
  //   const id = req.params.id;
  const cateogry = await Category.findById(id).select("-__v");
  if (!cateogry) {
    return res.status(404).json({ msg: `No category found with id ${id}` });
  }
  res.status(200).json({ data: cateogry });
}
//@ Des  Create new Category
//@ Route POST /api/v1/categories/:id
//@access public
async function createCategory(req, res) {
  const { name } = req.body;

  const category = await Category.create({ name });
  res.status(201).json({ data: category });
}
module.exports = {
  getCategories,
  getCategory,
  createCategory,
};
