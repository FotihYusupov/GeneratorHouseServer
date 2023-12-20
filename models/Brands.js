const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  brand_name: {
    type: String,
  },
});

const Brands = mongoose.model('brands', BrandSchema);

module.exports = Brands;
