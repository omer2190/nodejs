const mongoose = require('mongoose');

/**
 * تعريف مخطط لمنتج.
 * 
 * @typedef {Object} Product
 * @property {string} name - اسم المنتج.
 * @property {string} description - وصف مختصر للمنتج.
 * @property {number} price - سعر المنتج.
 * @property {string} image - رابط صورة المنتج.
 * @property {number} installmentAmount - المبلغ المدفوع لكل قسط.
 * @property {number} installmentCount - العدد الإجمالي للأقساط.
 * @property {'monthly'|'weekly'} installmentPeriod - فترة الأقساط، إما 'شهري' أو 'أسبوعي'. القيمة الافتراضية هي 'شهري'.
 */
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String, // ← هنا نضيف رابط الصورة
    installmentAmount: Number,
    installmentCount: Number,
    installmentPeriod: { type: String, enum: ['monthly', 'weekly'], default: 'monthly' },
});
module.exports = mongoose.model('Product', productSchema);
