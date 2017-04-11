// app/models/starbucks.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var orderSchema   = new Schema({
   Coffee: String,
   CupSize: String
   
});

module.exports = mongoose.model('order', orderSchema);



