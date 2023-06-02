const Book = require('../models/book')
const Schedule = require('../models/schedule')

// Based on https://www.30secondsofcode.org/js/s/days-in-month/.
const daysInMonth = (month, year) => {
  const numDays = new Date(year, month, 0).getDate()
  return numDays
}

const daysLeftInMonth = () => {
  let date = new Date()
  let month = date.getMonth()
  let year = date.getFullYear()
  let day = date.getDate()
  let daysLeft = daysInMonth(month, year) - day + 2
  return daysLeft
}

const calculateSchedule = async (req) => {
  let schedule = await Schedule.findOne({ user: req.user.id })
  let date = new Date()
  let daysLeft =
    daysInMonth(date.getMonth(), date.getFullYear()) - date.getDate() + 2
  let books = await Book.find({ user: req.user.id })
  let totalPages = 0
  books.forEach((book) => {
    totalPages += book.endPage - book.startPage
  })
  let dailyGoal = []
  let dailyReading = []
  for (i = 0; i < daysLeft; i++) {
    dailyGoal.push(totalPages / daysLeft)
    dailyReading.push(0)
  }
  let newSchedule = {
    user: req.user._id,
    dailyGoal: dailyGoal,
    dailyReading: dailyReading
  }
  if (!schedule) {
    await Schedule.create(newSchedule)
  } else {
    await Schedule.updateOne(
      { user: req.user._id },
      { $set: { dailyGoal: dailyGoal, dailyReading: dailyReading } }
    )
  }
}

const checkForFirstLogin = async (req, date) => {
  const lastMonth = req.user.lastUsed.getMonth()
  const thisMonth = date.getMonth()
  if (thisMonth - lastMonth > 0) {
    oldBooks = await Book.deleteMany({ user: req.user._id })
    oldSchedule = await Schedule.deleteOne({ user: req.user._ids })
  } else {
    console.log('same month')
  }
}

const index = async (req, res) => {
  let books = []
  if (req.user) {
    books = await Book.find({ user: req.user._id })
    let date = new Date()
    checkForFirstLogin(req, date)
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
  let totalPagesPerDay
  let pagesToday
  if (req.user) {
    let curTime = new Date()
    req.user.lastUsed = curTime.toLocaleDateString()
    await req.user.save()
    let schedule = await Schedule.findOne({ user: req.user._id })
    if (schedule) {
      let daysLeft = daysLeftInMonth()
      pagesToday =
        schedule.dailyReading[schedule.dailyReading.length - daysLeft]
      if (pagesToday === 0) {
        calculateSchedule(req)
      }
      totalPagesPerDay = Math.floor(
        schedule.dailyGoal[schedule.dailyGoal.length - 1]
      )
    } else {
      totalPagesPerDay = ''
      pagesToday = ''
    }
  }
  console.log(books)
  let stats = { totalPagesLeft, totalPagesPerDay, pagesToday }
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
    calculateSchedule(req)
    res.redirect('/')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
}

const update = async (req, res) => {
  let books = []
  if (req.user) {
    books = await Book.find({ user: req.user._id })
    let title = books[`${req.params.book}`].title
    let pageIncrease = req.body.startPage - books[req.params.book].startPage
    await Book.updateOne(
      { title: title, user: req.user._id },
      { $set: { startPage: req.body.startPage } }
    )
    let schedule = await Schedule.findOne({ user: req.user._id })
    let date = new Date()
    let month = date.getMonth()
    let year = date.getFullYear()
    let day = date.getDate()
    let daysLeft = daysInMonth(month, year) - day + 2
    let newTotal =
      schedule.dailyReading[schedule.dailyReading.length - daysLeft]
    newTotal += pageIncrease
    schedule.dailyReading[schedule.dailyReading.length - daysLeft] = newTotal
    await schedule.save()
  }
  res.redirect('/')
}

module.exports = { index, addBook, addInterface, update }
