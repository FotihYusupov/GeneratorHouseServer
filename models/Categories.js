const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
});

const Categories = mongoose.model('categories', CategorySchema);

module.exports = Categories;
