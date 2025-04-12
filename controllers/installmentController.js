// controllers/installmentController.js
const Installment = require('../models/Installment');
const { getInstallmentStatus } = require('../utils/installmentUtils');

exports.getInstallmentsByOrder = async (req, res) => {
    try {
        const orderId = req.query.orderId;
        if (!orderId) return res.status(400).json({ error: 'Order ID is required' });
        const installments = await Installment.find({ orderId: orderId  });
        const result = installments.map(i => ({
            dueDate: i.dueDate,
            amount: i.amount,
            paid: i.paid,
            status: getInstallmentStatus(i.dueDate, i.paid)
        }));
        ///reten jset status= مدفوع

        res.json(result.filter(i => i.status === '✅ مدفوع'|| i.status === '❌ متأخر'|| i.status === '🔔 مستحق اليوم'));
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
