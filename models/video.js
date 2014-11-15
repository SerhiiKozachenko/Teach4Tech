var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
  title:  String,
  length: String,
  author: String,
  comments: [{ body: String, date: Date }],
  date: Date,
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

module.exports = mongoose.model('Video', videoSchema);