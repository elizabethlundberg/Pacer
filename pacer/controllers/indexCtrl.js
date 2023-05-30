const Book = require('../models/book')

const index = async (req, res) => {
  res.render('index')
}

module.exports = { index }
