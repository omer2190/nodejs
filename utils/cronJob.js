const cron = require('node-cron');
const Installment = require('../models/Installment');
const Product = require('../models/Product');
const { getInstallmentStatus } = require('../utils/installmentUtils');
const Order = require('../models/Order');
const axios = require('axios');

// ✅ استدعاء p-limit داخل async function
async function scheduleJob() {
  const { default: pLimit } = await import('p-limit');
  const limit = pLimit(1); // 1 يعني فقط ركوست واحد بنفس اللحظة

  cron.schedule('* * * * *', async () => {
    try {
      const installments = await Installment.find({ paid: false });

      installments.forEach(installment => {
        limit(async () => {
          const status = getInstallmentStatus(installment.dueDate, installment.paid);

          if (status === '🔔 مستحق اليوم' || status === '❌ متأخر') {
            const order = await Order.findById(installment.orderId);
            if (order) {
              console.log(`🔔 Payment is due: ${order.customerName}, ID: ${order.customerId}`);
              await decreaseBalance(order.customerId, parseInt(installment.amount));
            } else {
              console.log(`❌ Order not found: ${installment.orderId}`);
            }
          }
        });
      });

    } catch (err) {
      console.error('❌ Failed to check due installments:', err.message);
    }
  });
}

// ✨ استدعِ دالة البدء
scheduleJob();

// تابع decreaseBalance كما هو 👇
async function decreaseBalance(userId, amount) {
  try {
    const response = await axios.post(
      'https://lavenderblush-lion-238730.hostingersite.com/api/user/decrease',
      {
        user_id: userId,
        amount: amount
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ Deduction successful!');
    console.log('💰 New balance:', response.data.new_balance);

  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 404) {
        console.error('❌ User not found.');
      } else if (status === 400) {
        console.error('⚠️ Insufficient balance!');
        console.log('📉 Current balance:', data.current_balance);
      } else {
        console.error(`🚫 Unexpected error [${status}]:`, data.message || data);
      }

    } else {
      console.error('❌ Failed to connect to the server:', error.message);
    }
  }
}
