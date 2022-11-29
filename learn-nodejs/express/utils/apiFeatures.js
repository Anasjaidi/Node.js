module.exports = class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query
    this.queryObj = queryObj
  }

  filter() {
    const filtredQuery = { ...this.queryObj }
    const excludedFields = ['page', 'sort', 'limit', 'fields']

    excludedFields.forEach((ex) => delete filtredQuery[ex])

    let queryString = JSON.stringify(filtredQuery)

    queryString = queryString.replace(
      /\b(lt|gt|lte|gte)\b/,
      (match) => `$${match}`
    )

    this.query = this.query.find(JSON.parse(queryString))

    return this
  }

  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(',').join(' ')

      this.query = this.query.sort(sortBy)
    }

    return this
  }

  fields() {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(',').join(' ')

      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }

    return this
  }

  paginate() {
    const page = this.queryObj.page * 1 || 1

    const limit = this.queryObj.limit * 1 || 30

    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}
