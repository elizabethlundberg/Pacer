const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scheduleSchema = new Schema(
  {
    user: Schema.Types.ObjectId,
    dailyGoal: [Number],
    dailyReading: [Number]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Schedule', scheduleSchema)
