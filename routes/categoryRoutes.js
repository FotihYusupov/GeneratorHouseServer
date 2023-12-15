const { Router } = require('express');
const categoryController = require('../controllers/categoryController');

const router = Router();

router.get('/categories', categoryController.getCategories);

module.exports = router;
