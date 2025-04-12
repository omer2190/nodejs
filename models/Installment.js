const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    dueDate: Date,
    amount: Number,
    paid: { type: Boolean, default: false },
    paidAt: Date,
});
module.exports = mongoose.model('Installment', installmentSchema);
