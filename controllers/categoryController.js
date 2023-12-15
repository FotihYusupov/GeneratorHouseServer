const Categories = require('../models/Categories');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    return res.json(categories);
  } catch (err) {
    return res.json('Interval server error');
  }
};
