const { Router } = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.get('/products', productController.getAll);
router.get('/category/:categoryId', productController.byCategory);
router.get('/product/:id', productController.byId);
router.get('/search/:title', productController.searchProduct);
router.post('/add-product', authMiddleware, productController.addProduct);
router.put('/update-product/:id', authMiddleware, productController.updateProduct);
router.put('/add-img/:id', productController.upload.array('images'), productController.addImg);
router.put('/offer/:id', authMiddleware, productController.offerProduct);
router.delete('/delete/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
