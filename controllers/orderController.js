const Installment = require('../models/Installment');
// controllers/orderController.js
const Order = require('../models/Order');
// controllers/productController.js
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.createOrder = async (req, res) => {
    try {
        const { productId, customerName,customerId,customerPhone } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const startDate =  Date.now();
        const order = new Order({ productId, customerName, startDate ,customerId,customerPhone});
        await order.save();
       

        const installments = [];
        let date = new Date(startDate);
        for (let i = 0; i < product.installmentCount; i++) {
            installments.push({
                orderId: order._id,
                dueDate: new Date(date),
                amount: product.installmentAmount
            });
            if (product.installmentPeriod === 'monthly') date.setMonth(date.getMonth() + 1);
            else date.setDate(date.getDate() + 7);
        }

        await Installment.insertMany(installments);
        res.status(201).json({ order, installments });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getOrdersByProduct = async (req, res) => {
    try {
        console.log('Product ID:', req.params.productId);
        const id = req.params.productId || req.body.productId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: '❌ productId غير صالح' });
        }
        const orders = await Order.find({ productId:new mongoose.Types.ObjectId(req.params.productId) });
        res.json(orders.map(order => ({
            _id: order._id,
            customerName: order.customerName?? '',
            customerId: order.customerId?? '',
            startDate: order.startDate?? '',
            productId: order.productId,
            customerPhone: order.customerPhone?? '',
        })));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
