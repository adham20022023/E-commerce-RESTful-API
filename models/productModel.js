const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "Title must be at least 3 characters long"],
      maxLength: [100, "Title must be at most 100 characters long"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product Description is required"],
      minLength: [20, "Description must be at least 10 characters long"],
      maxLength: [500, "Description must be at most 500 characters long"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      trim: true,
      max: [200000, " price can't exceed 200000"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    Colors: {
      type: [String],
    },
    imageCover: {
      type: String,
      required: [true, "Product Image cover is required"],
    },
    images: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must be belong to a category"],
    },
    subcategories: [{ type: mongoose.Schema.ObjectId, ref: "SubCategory" }],
    brand: { type: mongoose.Schema.ObjectId, ref: "Brand" },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
// mongoose Query Middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  });
  next();
});
module.exports = mongoose.model("Product", productSchema);
