const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');


router.get('/', discountController.getAll); 
router.get('/:id', discountController.getById); 


module.exports = router;