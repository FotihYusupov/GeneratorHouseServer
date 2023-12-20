const { Router } = require('express');
const brandsController = require('../controllers/brandController');

const router = Router();

router.get('/brands', brandsController.getBrands);
router.post('/add-brand', brandsController.addBrand);
router.put('/update-brand/:id', brandsController.updateBrand);
router.delete('/delete-brand/:id', brandsController.removeBrand);

module.exports = router;
