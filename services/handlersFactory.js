const asyncHandler = require("express-async-handler");
const AppError = require("../utils/Api-error");
const ApiFeatures = require("../utils/apiFeature");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      // return res.status(404).json({ Message: "Category Not Found" });
      return next(new AppError(`No document found with id ${id}`, 404));
    }

    res.status(204).send();
  });
exports.UpdateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      // return res.status(404).json({ message: "Category not found" });
      return next(
        new AppError(`No Category found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ data: document });
  });
exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);

    res.status(201).json({ data: document });
  });
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      // return res.status(404).json({ msg: `No category found with id ${id}` });
      return next(
        new AppError(`No Document Found with id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ data: document });
  });
exports.getAll = (Model, modelName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObject) {
      filter = req.filterObject;
    }
    const countDocuments = await Model.countDocuments();
    // Build Query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .search(modelName)
      .paginate(countDocuments);
    //Execute Query
    const { mongooseQuery, PaginationResult } = apiFeatures;
    // console.log(mongooseQuery);
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ result: documents.length, PaginationResult, data: documents });
  });
