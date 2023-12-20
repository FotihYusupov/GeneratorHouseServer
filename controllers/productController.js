const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const Products = require('../models/Products');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname}`);
  },
});

exports.upload = multer({ storage });

exports.getAll = async (req, res) => {
  try {
    const products = await Products.find().populate('brand').populate('category');
    return res.json(products);
  } catch (err) {
    return res.json(err);
  }
};

exports.byCategory = async (req, res) => {
  try {
    const products = await Products.find({ category: req.params.categoryId }).populate('brand').populate('category');
    return res.json(products);
  } catch (err) {
    return res.json(err);
  }
};

exports.byId = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.id }).populate('brand').populate('category');
    product.views += 1;
    await product.save();
    return res.json(product);
  } catch (err) {
    return res.json(err);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = new Products({
      product_title: req.body.productTitle,
      product_desc: req.body.productDesc,
      category: req.body.category,
      information: req.body.information,
      brand: req.body.brand,
    });
    if (!req.body.price !== undefined) {
      product.product_price = req.body.productPrice;
    }
    await product.save();
    return res.json(product);
  } catch (err) {
    return res.send(err);
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const regex = new RegExp(req.params.title, 'i');
    const products = await Products.find({ product_title: { $regex: regex } }).populate('brands').populate('category');
    return res.json(products);
  } catch (err) {
    return res.json(err);
  }
};

exports.addImg = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findOne({ _id: id });
    if (product) {
      product.product_img.push(process.env.URL + req.files[0].filename);
      await Products.updateOne({ _id: id }, { product_img: product.product_img });
      return res.send('Product updated');
    }
    return res.status(404).json('product not found');
  } catch (err) {
    return res.json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Products.updateOne({
      _id: req.params.id,
    }, {
      product_title: req.body.productTitle,
      product_desc: req.body.productDesc,
      product_price: req.body.productPrice,
      product_img: req.body.productImg,
      category: req.body.category,
      information: req.body.information,
    }, {
      new: true,
    });
    return res.json(product);
  } catch (err) {
    return res.json(err);
  }
};

exports.offerProduct = async (req, res) => {
  try {
    const product = await Products.findById({ _id: req.params.id });
    product.offer = true;
    product.new_price = req.body.newPrice;
    await product.save();
    return res.json(product);
  } catch (err) {
    return res.json('Internal server error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Products.deleteOne({ _id: req.params.id });
    return res.json('Product deleted');
  } catch (err) {
    return res.json('Internal server error');
  }
};
