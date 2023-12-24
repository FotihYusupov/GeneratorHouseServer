const { Router } = require('express');
const DiscountController = require('../controllers/discountController');

const router = Router();

router.get('/get-discounts', DiscountController.getDiscounts);
router.put('/update-discounts/:id', DiscountController.updateDiscount);

module.exports = router;
