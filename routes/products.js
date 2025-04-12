// routes/products.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
// const upload = require('../middlewares/upload'); // ← استدعاء middleware رفع الصور
/////////////
// const express = require('express');
const multer = require('multer');
// const supabase = require('../supabaseClient');
// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer({ dest: 'uploads/' });


router.post('/',upload.single('image'), controller.createProduct);
router.get('/', controller.getAllProducts);
router.delete('/', controller.deleteProduct);

module.exports = router;