const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema(
  {
    title: String,
    author: String,
    startPage: Number,
    endPage: Number,
    user: Schema.Types.ObjectId
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Book', bookSchema)
