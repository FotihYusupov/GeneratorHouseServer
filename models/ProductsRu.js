const mongoose = require('mongoose');

const ProductsRuSchema = new mongoose.Schema({
  product_img: {
    type: Array,
    default: [],
  },
  product_title: {
    type: String,
  },
  product_desc: {
    type: String,
  },
  product_price: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'categoriesRu',
  },
  brand: {
    type: mongoose.Types.ObjectId,
    ref: 'brandsRu',
  },
  information: {
    type: Array,
    default: [],
  },
  offer: {
    type: Boolean,
    default: false,
  },
  new_price: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
});

const ProductsRu = mongoose.model('productsRu', ProductsRuSchema);

module.exports = ProductsRu;
