const Book = require('../models/book')

// Based on https://www.30secondsofcode.org/js/s/days-in-month/.
const daysInMonth = (month, year) => {
  const numDays = new Date(year, month, 0).getDate()
  return numDays
}

const index = async (req, res) => {
  let books = []
  if (req.user) {
    books = await Book.find({ user: req.user._id })
    req.user.lastUsed = new Date()
  }
  const date = new Date()
  const totalDays = daysInMonth(date.getMonth(), date.getFullYear())
  // One "plus one" to fix JS off-by-one date error, one "plus one" to include the last day of the month
  const daysLeft = totalDays - date.getDate() + 2
  let totalPagesLeft = 0
  books.forEach((book) => {
    let pagesLeft = book.endPage - book.startPage
    pagesLeft = Math.floor(pagesLeft)
    book.pagesLeft = pagesLeft
    totalPagesLeft += pagesLeft
    let pgsPerDay = (book.endPage - book.startPage) / daysLeft
    pgsPerDay = Math.floor(pgsPerDay)
    book.pgsPerDay = pgsPerDay
  })
  let totalPagesPerDay = Math.floor(totalPagesLeft / daysLeft)
  let stats = { totalPagesLeft, totalPagesPerDay }
  res.render('index', { user: req.user, books, stats })
}

const addInterface = async (req, res) => {
  let books = []
  if (req.user) {
    books = await Book.find({ user: req.user._id })
  }
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  const totalDays = daysInMonth(month, year)
  let totalPagesLeft = 0
  books.forEach((book) => {
    let pagesLeft = book.endPage - book.startPage
    pagesLeft = Math.floor(pagesLeft)
    book.pagesLeft = pagesLeft
    totalPagesLeft += pagesLeft
    let pgsPerDay = (book.endPage - book.startPage) / totalDays
    pgsPerDay = Math.floor(pgsPerDay)
    book.pgsPerDay = pgsPerDay
  })
  let stats = { totalPagesLeft }
  res.render('addBooks', { user: req.user, books, stats })
}

const addBook = async (req, res) => {
  try {
    let book = req.body
    book.user = req.user._id
    const successMsg = await Book.create(req.body)
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

module.exports = { index, addBook, addInterface }
