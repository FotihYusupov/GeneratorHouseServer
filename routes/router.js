const { Router } = require('express');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const brandsRoutes = require('./brandsRoutes');
const categoryRuRoutes = require('./categoriesRoutesRu');
const productRuRoutes = require('./productsRoutesRu');

const router = Router();

router.use(userRoutes);
router.use(categoryRoutes);
router.use(productRoutes);
router.use(brandsRoutes);

router.use('/ru', categoryRuRoutes);
router.use('/ru', productRuRoutes);

module.exports = router;
