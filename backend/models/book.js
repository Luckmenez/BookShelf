const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  id: {type: String, require: true},
  title:  {type: String, require: true},
  author: {type: String, require: true},
  pages: {type: String, require: true}
});

module.exports = mongoose.model('Cliente', bookSchema);
