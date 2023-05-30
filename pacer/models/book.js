// const FakeBook = [
//   {
//     title: 'Streisand: The Mirror of Difference',
//     author: 'Stewart, Garrett',
//     startPage: 1,
//     endPage: 226
//   },
//   { title: 'Just Us', author: 'Rankine, Claudia', startPage: 5, endPage: 342 }
// ]

// module.exports = { FakeBook }

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
