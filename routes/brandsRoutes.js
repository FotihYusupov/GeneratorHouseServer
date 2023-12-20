const { Router } = require('express');
const brandsController = require('../controllers/brandController');

const router = Router();

router.get('/brands', brandsController.getBrands);
router.post('/add-brand', brandsController.addBrand);
router.delete('/delete/:id', brandsController.removeBrand);

module.exports = router;
