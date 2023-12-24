const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
  discount_arr: {
    type: Array,
    default: [],
  },
});

const Discounts = mongoose.model('discounts', DiscountSchema);

module.exports = Discounts;
