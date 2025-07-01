const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const fs = require('fs');
const path = require('path');
exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    {
      const doc = await Model.create(req.body);
      res.status(201).json({ data: doc });
    }
  });
exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Model.countDocuments();
    const docs = await Model.find().skip(skip).limit(limit);

    res.status(200).json({
      total,
      count: docs.length,
      page,
      limit,
      data: docs,
    });
  });
exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findById(id);
    if (!doc) {
      return next(new ApiError(`${Model.modelName} Not found`, 404));
    }
    res.status(200).json({ data: doc });
  });
exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new ApiError(`${Model.modelName} Not found`, 404));
    }
    res.status(200).json({ data: doc });
  });
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new ApiError(`${Model.modelName} Not found`, 404));
    }

    res;
    res
      .status(200)
      .json({ message: `${Model.modelName} deleted successfully` });
  });
exports.deleteUploadedFiles = (filesArray) => {
  filesArray.forEach((file) => {
    fs.unlink(
      path.join(__dirname, `../public/uploads/${file.filename}`),
      (err) => {
        if (err) console.error('Failed to delete file:', file.filename);
      }
    );
  });
};
