// index.js
const express = require('express');
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const installmentRoutes = require('./routes/installments');
// const { createClient } = require('@supabase/supabase-js');
require('./utils/cronJob'); 
const path = require('path');

const app = express();
const PORT = 3000;

// إعداد dotenv لتحميل المتغيرات البيئية من ملف .env
dotenv.config();

app.use(express.json());

// Route بسيطة
app.get('/', (req, res) => {
  res.send('أهلاً بك في API عمر! 🚀');
});

// Route ترجع بيانات JSON
app.get('/hello', (req, res) => {
  res.json({ message: 'مرحباً بك من الAPI البسيطة 🎉' });
});

// Route تستقبل بيانات
app.post('/greet', (req, res) => {
  const name = req.body.name || 'مجهول';
  res.json({ greeting: `أهلاً بك يا ${name}! 👋` });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/installments', installmentRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_ANON_KEY
//   );

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
