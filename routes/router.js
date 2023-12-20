const { Router } = require('express');
const userRoutes = require('./userRoutes');
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const brandsRoutes = require('./brandsRoutes');

const router = Router();

router.use(userRoutes);
router.use(categoryRoutes);
router.use(productRoutes);
router.use(brandsRoutes);

module.exports = router;
