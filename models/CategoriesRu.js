const mongoose = require('mongoose');

const CategoryRuSchema = new mongoose.Schema({
  category_name: {
    type: String,
  },
});

const CategoriesRu = mongoose.model('categoriesRu', CategoryRuSchema);

module.exports = CategoriesRu;
