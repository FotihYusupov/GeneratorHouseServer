const Discounts = require('../models/Discounts');

exports.getDiscounts = async (req, res) => {
  try {
    const discount = await Discounts.find();
    return res.json(discount);
  } catch (err) {
    return res.json('Error: ', err);
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const findDiscount = await Discounts.findById(req.params.id);
    findDiscount.discount_arr = req.body.discountArr;
    await findDiscount.save();
    return res.json(findDiscount);
  } catch (err) {
    return res.json('Error: ', err);
  }
};
