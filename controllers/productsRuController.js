const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ProductsRu = require('../models/ProductsRu');
const CategoriesRu = require('../models/CategoriesRu');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}:${file.originalname}`);
  },
});

exports.upload = multer({ storage });

exports.getAll = async (req, res) => {
  try {
    const products = await ProductsRu.find().populate('brand').populate('category');
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

exports.byCategory = async (req, res) => {
  try {
    const products = await ProductsRu.find({ category: req.params.categoryId }).populate('brand').populate('category');
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

exports.byId = async (req, res) => {
  try {
    const product = await ProductsRu.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    ).populate('brand').populate('category');
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const product = new ProductsRu({
      product_title: req.body.productTitle,
      product_desc: req.body.productDesc,
      category: req.body.category,
      information: req.body.information,
      brand: req.body.brand,
      product_price: req.body.productPrice !== undefined ? req.body.productPrice : 0,
    });
    await product.save();
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

exports.searchProduct = async (req, res) => {
  try {
    const regex = new RegExp(req.params.title, 'i');
    const products = await ProductsRu.find({ product_title: { $regex: regex } }).populate('brand').populate('category');
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

exports.addImg = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductsRu.findOne({ _id: id });
    if (product) {
      for (let i = 0; i < req.files.length; i += 1) {
        product.product_img.push(process.env.URL + req.files[i].filename);
      }
      await ProductsRu.updateOne({ _id: id }, { product_img: product.product_img });
      return res.send('Product updated');
    }
    return res.status(404).json('product not found');
  } catch (err) {
    return res.json(err);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await ProductsRu.findByIdAndUpdate(
      req.params.id,
      {
        product_title: req.body.productTitle,
        product_desc: req.body.productDesc,
        product_price: req.body.productPrice,
        product_img: req.body.productImg,
        category: req.body.category,
        information: req.body.information,
      },
      { new: true },
    );
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

exports.offerProduct = async (req, res) => {
  try {
    const product = await ProductsRu.findByIdAndUpdate(
      req.params.id,
      { offer: true, new_price: req.body.newPrice },
      { new: true },
    );
    res.json(product);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const product = await ProductsRu.findById({ _id: req.params.id });
    product.offer = false;
    product.new_price = 0;
    await product.save();
    return res.json(product);
  } catch (err) {
    return res.json('Internal server error');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await ProductsRu.deleteOne({ _id: req.params.id });
    res.json('Product deleted');
  } catch (err) {
    res.json(err);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoriesRu.find();
    res.json(categories);
  } catch (err) {
    res.json(err);
  }
};
