var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  issuer: {
    type: String,
    required: true
  },
  url: {
    type: String
  }
});

module.exports = mongoose.model('CreditCard', schema);
