const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    customerName: String,
    customerId: String,
    startDate: Date,
    customerPhone: String,
});
module.exports = mongoose.model('Order', orderSchema);
