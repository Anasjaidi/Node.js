const mongoose = require('mongoose')

// creating our schema

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        'A tour must have a name',
      ],
      unique: true,
    },
    price: {
      type: Number,
      required: [
        true,
        'a tour must have a price',
      ],
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
)

const Tour = mongoose.model(
  'Tour',
  tourSchema
)

module.exports = Tour
