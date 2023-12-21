const CategoriesRu = require('../models/CategoriesRu');

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoriesRu.find();
    return res.json(categories);
  } catch (err) {
    return res.json('Interval server error');
  }
};
