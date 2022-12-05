const mongoose = require('mongoose')
const slugify = require('slugify')
// const validator = require('validator')

// creating our schema

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [100, 'a tour name must have maximum 100 char'],
      minLength: [3, 'a tour name must have minimum 3 char'],
      // validate: [validator.isAlpha, 'error message']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'a tour must have duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour must have diffuclty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty accept only easy medium and difficult',
      },
    },
    price: {
      type: Number,
      required: [true, 'a tour must have a price'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      max: [5, 'ratingsAverage  most be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // point on doc only in create not in update
          return val < this.price
        },
        message: 'pricediscount: {VALUE} must be lowe than price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'a tour must have summary!'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have cover image!'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
    secret: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7
})

// runs before save and create only
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, strict: true })
  next()
})

// runs after save and create only
// tourSchema.post('save', function (doc, next) {
//   console.log(doc)
//   next()
// })

tourSchema.pre(/^find/, function (next) {
  this.find({ secret: { $ne: true } })
  next()
})

// tourSchema.pre('find', function (next) {
//   this.find({ secret: { $ne: true } })
// })

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secret: { $ne: true } } })
  next()
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour
