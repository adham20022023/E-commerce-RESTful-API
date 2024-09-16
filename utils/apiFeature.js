/* eslint-disable node/no-unsupported-features/es-syntax */
class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
    excludedFields.forEach((field) => delete queryObj[field]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      const query = {};
      if (modelName === "products") {
        query.$or = [
          {
            title: { $regex: this.queryString.keyword, $options: "i" },
          },
          {
            description: { $regex: this.queryString.keyword, $options: "i" },
          },
        ];
      } else {
        query.$or = [
          {
            name: { $regex: this.queryString.keyword, $options: "i" },
          },
        ];
      }

      this.query = this.query.find(query);
    }
    return this;
  }

  paginate(count) {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 15;
    const skip = (page - 1) * limit;
    //pagination Result
    const Pagination = {};
    Pagination.currentPage = page;
    Pagination.limit = limit;
    Pagination.numberOfPages = Math.ceil(count / limit);
    //next page
    Pagination.next = page + 1 > Pagination.numberOfPages ? null : page + 1;
    //previous page
    Pagination.previous = page - 1 < 1 ? null : page - 1;

    this.mongooseQuery = this.query.skip(skip).limit(limit);
    this.PaginationResult = Pagination;
    return this;
  }
}
module.exports = ApiFeatures;
