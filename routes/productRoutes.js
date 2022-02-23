const express = require('express');
const router = express.Router();

const { uploadProductImage } = require('../controllers/uploadsController');
const { createProduct, getAllProducts } = require('../controllers/productController');


router.route('/').post(createProduct).get(getAllProducts);
router.route('/uploads').post(uploadProductImage);

module.exports = router;
