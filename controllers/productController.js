// controllers/productController.js
const Product = require('../models/Product');
const validateRequest = require('../middlewares/validations');

exports.createProduct = async (req, res) => {
    try {
        // console.log('✅ body:', req.body);
        // console.log('🖼️ file:', req.file);
        
        // const {name, description, price, installmentAmount, installmentCount, installmentPeriod} = req.body;
        const errors = validateRequest.validateRequest(req, ["name","description","price","installmentAmount","installmentCount","installmentPeriod"], {
            name: 'string',
            description: 'string',
            price: 'string',
            // installmentAmount: 'string',
            installmentCount: 'string',
          });
        //   if (!errors.valid) {
        //     return res.status(400).json({ message: errors.message });
        //   }

          const image = req.file ? req.file.path : null;
        const newProduct = new Product({
          ...req.body,
          installmentAmount: parseFloat(req.body.price) / parseInt(req.body.installmentCount),
          image: image
        });

    
        await newProduct.save();
    
        res.status(201).json({ message: '✅ تم إضافة المنتج بنجاح', product: newProduct });
      } catch (err) {
        console.error('❌ Error:', err);
        res.status(500).json({ message: '❌ حدث خطأ أثناء إضافة المنتج', error: err.message });
      }
};
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        // تعيين القيم الافتراضية للمنتجات التي تفتقر إلى بعض الحقول
    const formattedProducts = products.map(product => {
        return {
          _id: product._id || null,
          name: product.name || 'منتج غير معروف',
          description: product.description || 'لا توجد تفاصيل',
          price: product.price || 0,
          productType: product.installmentCount> 1 ? 'قسط' : 'كاش',
          installmentAmount: product.installmentAmount || 0,
          installmentCount: product.installmentCount || 0,
          installmentPeriod: product.installmentPeriod || 'شهري',  // القيمة الافتراضية
          image: product.image || 'رابط الصورة غير متوفر',  // إضافة صورة افتراضية إذا لم تكن موجودة
        };
      });
        res.json(formattedProducts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.deleteProduct = async (req, res) => {
    try {
      conditions=  await Product.findByIdAndDelete(req.query.id);
        if (conditions.length === 0) {
            return res.status(404).json({ message: '❌ المنتج غير موجود' });
        }
        res.json({ message: '🗑️ تم حذف المنتج' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
