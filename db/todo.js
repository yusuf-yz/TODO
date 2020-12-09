const mongoose = require('mongoose');
const db = require('./index.js');

const ToDoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannot be empty.'],
    trim: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

const ToDoModel = db.model('todo', ToDoSchema);

module.exports = ToDoModel;