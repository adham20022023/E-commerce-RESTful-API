const express = require("express");
const {
  createSubCategory,
  getSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
  setCategoryIdToBody,
  createfilterObj,
} = require("../services/subcategoryService");

const {
  createSubCategoryValidator,
  getSubcategoryValidator,
  updateSubcategoryValidator,

  deleteSubcategoryValidator,
} = require("../utils/validators/subcategoryValidator");
//mergeParams : allow us to access parameters on other routers
//ex: we need to access categoryId on subcategories router
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createfilterObj, getSubcategories);
router
  .route("/:id")
  .get(getSubcategoryValidator, getSubcategory)
  .put(updateSubcategoryValidator, updateSubcategory)
  .delete(deleteSubcategoryValidator, deleteSubcategory);
module.exports = router;
