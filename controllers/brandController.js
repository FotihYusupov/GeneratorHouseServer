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

exports.updateBrand = async (req, res) => {
  try {
    const findBrand = await Brands.findById(req.params.id);
    findBrand.brand_name = req.body.brandName;
    await findBrand.save();
    return res.json('Brand updated');
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
