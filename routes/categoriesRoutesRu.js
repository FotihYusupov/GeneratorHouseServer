const { Router } = require('express');
const categoriesRuController = require('../controllers/categoriesRuController');

const router = Router();

router.get('/categories', categoriesRuController.getCategories);

module.exports = router;
