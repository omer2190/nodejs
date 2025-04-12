// routes/installments.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/installmentController');

router.get('/', controller.getInstallmentsByOrder);

module.exports = router;