const Brands = require('../models/Brands');

exports.getBrands = async (req, res) => {
  try {
    const categories = await Brands.find();
    return res.json(categories);
  } catch (err) {
    return res.json(err);
  }
};

exports.addBrand = async (req, res) => {
  try {
    const newBrand = new Brands({
      brand_name: req.body.brandName,
    });
    await newBrand.save();
    return res.json(newBrand);
  } catch (err) {
    return res.json(err);
  }
};

exports.removeBrand = async (req, res) => {
  try {
    await Brands.findByIdAndDelete(req.params.id);
    return res.json('Brand deleted');
  } catch (err) {
    return res.json(err);
  }
};
