const { Router } = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

router.post('/login', userController.login);
router.post('/update-user', authMiddleware, userController.updateUser);

module.exports = router;
