var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  issuer: {
    type: String
  },
  description: {
    type: String
  },
  url: {
    type: String
  }
});

module.exports = mongoose.model('CreditCard', schema);
