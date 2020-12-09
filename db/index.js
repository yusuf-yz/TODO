const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/todo', {useNewUrlParser: true, useUnifiedTopology: true});

db.once('open', () => {
  console.log('database connect success...');
});

db.once('error', () => {
  console.log('database connect fail...');
});

module.exports = db;